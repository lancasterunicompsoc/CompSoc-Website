mod fairings;
mod routes;

use rocket::*;

use crate::{
    fairings::FairingManager,
    routes::RouteManager,
};


#[launch]
fn rocket() -> _ {
    rocket::build().add_fairings().add_routes()
}
