use rocket::*;
use rocket_dyn_templates::{Template, context};

use super::RouteProvider;


#[get("/")]
fn index() -> Template {
    Template::render("index", context!{title: "LU CSS"})
}


pub struct HomeRoutes;

impl RouteProvider for HomeRoutes {
    fn base_url() -> &'static str {
        "/"
    }

    fn routes() -> Vec<Route> {
        routes![index]
    }
}
