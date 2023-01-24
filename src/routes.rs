mod home;

use rocket::{*, fs::FileServer};

use home::HomeRoutes;

pub trait RouteProvider {
    fn base_url() -> &'static str;
    
    fn routes() -> Vec<Route>;
}


pub trait RouteManager {
    fn add_routes(self) -> Self;
}

impl RouteManager for Rocket<Build> {
    fn add_routes(self) -> Self {
        self.mount(HomeRoutes::base_url(), HomeRoutes::routes())
            .mount("/public", FileServer::from("public/"))
    }
}
