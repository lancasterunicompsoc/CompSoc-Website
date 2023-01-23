
use rocket::*;


pub trait RouteManager {
    fn add_routes(self) -> Self;
}

impl RouteManager for Rocket<Build> {
    fn add_routes(self) -> Self {
        self
    }
}
