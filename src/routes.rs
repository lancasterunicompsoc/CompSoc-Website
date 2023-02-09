mod home;

use std::path::{Path, PathBuf};

pub use macros::router;
use rocket::{*, fs::FileServer, request::FromRequest};

use home::HomeRoutes;

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


struct CSSGuard;

#[derive(Debug)]
enum CSSGuardError {}

#[async_trait]
impl<'r> FromRequest<'r> for CSSGuard {
    type Error = CSSGuardError;

    #[cfg(debug_assertions)]
    async fn from_request(req: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        let path = Path::new(req.uri().path().as_str());
        match path.extension() {
            Some(extension) => {
                if extension != "css" {
                    return request::Outcome::Forward(());
                }
            },
            None => return request::Outcome::Forward(())
        };
        request::Outcome::Success(CSSGuard {})
    }

    #[cfg(not(debug_assertions))]
    async fn from_request(req: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        request::Outcome::Forward(())
    }
}


#[get("/<path..>")]
fn styles(path: PathBuf, _css: CSSGuard) {
    let file_path = Path::new("public/").join(path);
    println!("Recompiling {:?}", file_path);
}

