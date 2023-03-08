pub mod rsx;
pub mod sass;


use rocket::*;

use crate::engines::sass::Sass;


pub trait FairingManager {
    fn add_fairings(self) -> Self;
}

impl FairingManager for Rocket<Build> {
    fn add_fairings(self) -> Self {
        self.attach(Sass::fairing())
    }
}
