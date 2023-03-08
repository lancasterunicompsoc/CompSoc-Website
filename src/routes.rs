mod home;

use std::path::{Path, PathBuf};

pub use macros::router;
use rocket::{*, fs::FileServer, http::ContentType};

use home::HomeRoutes;

use crate::engines::sass::{CSSGuard, Sass};

pub trait RouteProvider {
    fn base_url() -> &'static str;
    
    fn routes() -> Vec<Route>;
}


pub trait RouteManager {
    fn add_routes(self) -> Self;

    fn add_route_provider<Provider: RouteProvider>(self) -> Self;
}

impl RouteManager for Rocket<Build> {
    fn add_routes(self) -> Self {
        self.add_route_provider::<HomeRoutes>()
            .mount("/public", routes![styles])
            .mount("/public", FileServer::from("public/"))
    }

    fn add_route_provider<Provider: RouteProvider>(self) -> Self {
        self.mount(Provider::base_url(), Provider::routes())
    }
}


#[get("/<path..>")]
fn styles(path: PathBuf, _css: CSSGuard) -> Option<(ContentType, String)> {
    let path = match path.strip_prefix("css/") {
        Ok(p) => p.with_extension("scss"),
        Err(e) => { eprintln!("An error occurred {e:?}"); return None }
    };
    Sass::compile(Path::new("public/sass/").join(path))
        .ok()
        .map(|result| String::from_utf8(result).ok())
        .flatten()
        .map(|style| (ContentType::CSS, style))
}

