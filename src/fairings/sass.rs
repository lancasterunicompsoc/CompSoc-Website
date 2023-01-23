use std::{
    path::{PathBuf, Path},
    collections::HashMap,
    ops::Deref,
};

use rocket::{
    async_trait, Build, Rocket, Orbit,
    fairing::{Fairing, Info, Kind},
    log::PaintExt,
    yansi::Paint, tokio::{fs::{File, create_dir_all}, io::AsyncWriteExt},
};

use rsass::{compile_scss_path, output::{Format, Style}};
use walkdir::{WalkDir, DirEntry};


fn walk_files(root: &Path) -> impl Iterator<Item = DirEntry> {
    WalkDir::new(root).into_iter()
        .filter_map(|e| e.ok())
        .filter(|entry| match entry.metadata() {
            Ok(metadata) => metadata.is_file(),
            Err(_) => false
        })
        .filter(|entry| entry.file_name().to_str().to_owned().is_some())
}

fn file_is_not_partial(entry: &DirEntry) -> bool {
    entry.file_name().to_str().to_owned().map_or(false, |file_name| !file_name.starts_with("_"))
}


struct SassContext {
    pub sass_dir: PathBuf,
    pub css_dir: PathBuf,
    pub rsass_format: Format,
}

impl SassContext {
    fn new(sass_dir: PathBuf, css_dir: PathBuf) -> Self {
        Self {
            sass_dir, css_dir,
            rsass_format: Format { style: Style::Compressed, precision: 5 },
        }
    }
}


struct SassContextManager(SassContext);

impl SassContextManager {
    fn new(ctxt: SassContext) -> Self {
        SassContextManager(ctxt)
    }

    fn context<'a>(&'a self) -> impl Deref<Target=SassContext> + 'a {
        &self.0
    }

    async fn compile_all_and_write(&self) -> Result<(), HashMap<String, String>> {
        let sass_dir = &*self.context().sass_dir;

        let mut errors = HashMap::<String, String>::new();
        for entry in walk_files(sass_dir).filter(file_is_not_partial) {
            match self.compile(&entry) {
                Ok(result) => match self.write(&entry, result).await {
                    Ok(_) => (),
                    Err(e) => {
                            errors.insert(
                            entry.path().to_str().to_owned().unwrap().to_string(),
                            e.to_string()
                        );
                        ()
                    },
                },
                Err(e) => {
                    errors.insert(
                        entry.path().to_str().to_owned().unwrap().to_string(),
                        e.to_string()
                    );
                    ()
                }
            };
        };
        if errors.len() == 0 {
            Ok(())
        } else {
            Err(errors)
        }
    }

    fn compile(&self, src_entry: &DirEntry) -> Result<Vec<u8>, rsass::Error> {
        let file_name = src_entry.path().file_name().unwrap().to_str().unwrap().to_string();
        match compile_scss_path(&src_entry.path(), self.context().rsass_format) {
            Ok(result) => Ok(result),
            Err(e) => {
                rocket::error!("Failed to compile file '{}'", file_name);
                rocket::error!("Sass error: {:?}", e);
                Err(e)
            }
        }
    }

    async fn write(&self, src_entry: &DirEntry, result: Vec<u8>) -> std::io::Result<()> {
        let sass_dir = &self.context().sass_dir;
        let css_dir = &self.context().css_dir;
        let path = match src_entry.path().strip_prefix(sass_dir) {
            Ok(p) => p,
            Err(_) => return Ok(()),
        };
        let out_path = css_dir.join(path).with_extension("css");
        match out_path.parent() {
            Some(out_dir) => if !out_dir.exists() {
                create_dir_all(out_dir).await?;
            },
            None => ()
        }
        File::create(out_path).await?.write_all(&result).await
    }
}


pub struct Sass;

impl Sass {
    pub fn fairing() -> Self {
        Self{}
    }
}

#[async_trait]
impl Fairing for Sass {
    fn info(&self) -> Info {
        Info {
            name: "Sass Compiler",
            kind: Kind::Ignite | Kind::Liftoff | Kind::Singleton
        }
    }

    async fn on_ignite(&self, rocket: Rocket<Build>) -> rocket::fairing::Result {
        use rocket::figment::value::magic::RelativePathBuf;

        let sass_dir = rocket.figment()
                             .extract_inner::<RelativePathBuf>("sass_dir")
                             .map(|path| path.relative());
        let sass_path = match sass_dir {
            Ok(dir) => dir,
            Err(e) if e.missing() => "static/sass".into(),
            Err(e) => {
                rocket::config::pretty_print_error(e);
                return Err(rocket);
            }
        };

        let css_dir = rocket.figment()
                             .extract_inner::<RelativePathBuf>("css_dir")
                             .map(|path| path.relative());
        let css_path = match css_dir {
            Ok(dir) => dir,
            Err(e) if e.missing() => "static/css".into(),
            Err(e) => {
                rocket::config::pretty_print_error(e);
                return Err(rocket);
            }
        };

        let ctx = SassContext::new(sass_path, css_path);
        Ok(rocket.manage(SassContextManager::new(ctx)))
    }

    async fn on_liftoff(&self, rocket: &Rocket<Orbit>) {
        let ctx_manager = rocket.state::<SassContextManager>().expect("Sass Context not registered in on_ignite");

        let context = &*ctx_manager.context();

        let sass_dir = context.sass_dir.strip_prefix(std::env::current_dir().unwrap()).unwrap();
        let css_dir = context.css_dir.strip_prefix(std::env::current_dir().unwrap()).unwrap();

        rocket::info!("{}{}:", Paint::emoji("✨ "), Paint::magenta("Sass"));
        rocket::info_!("sass directory: {}", Paint::white(sass_dir.display()));
        rocket::info_!("css directory: {}", Paint::white(css_dir.display()));
        rocket::info_!("pre-compiling sass files");

        match ctx_manager.compile_all_and_write().await {
            Ok(_) => (),
            Err(e) => panic!("{:?}", e)
        };
    }
}
