mod home;

pub use macros::router;
use rocket::{*, fs::FileServer};

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
            .mount("/public", FileServer::from("public/"))
    }

    fn add_route_provider<Provider: RouteProvider>(self) -> Self {
        self.mount(Provider::base_url(), Provider::routes())
    }
}
