pub mod sass;


use rocket::*;
use rocket_dyn_templates::Template;

use crate::engines::sass::Sass;


pub trait FairingManager {
    fn add_fairings(self) -> Self;
}

impl FairingManager for Rocket<Build> {
    fn add_fairings(self) -> Self {
        self.attach(Template::fairing())
            .attach(Sass::fairing())
    }
}
