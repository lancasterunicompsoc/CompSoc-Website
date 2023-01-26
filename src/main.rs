mod engines;
mod routes;

use rocket::*;

use crate::{
    engines::FairingManager,
    routes::RouteManager,
};


#[launch]
fn rocket() -> _ {
    rocket::build().add_fairings().add_routes()
}
