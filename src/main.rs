mod fairings;

use rocket::*;
use rocket_dyn_templates::Template;

pub use crate::fairings::{
    sass::Sass,
};


#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Template::fairing())
        .attach(Sass::fairing())
}
