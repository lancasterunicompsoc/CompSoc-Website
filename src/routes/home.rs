use rocket::{http::ContentType, *};
use rocket_dyn_templates::{context, Template};

use crate::engines::rsx::*;
use super::{RouteProvider, router};

#[router("/")]
mod HomeRoutes {
    #[get("/")]
    fn index() -> Template {
        Template::render("index", context! {title: "LU CSS"})
    }

    #[component_route(get, "/agm", AGM)]
    fn agm() -> Html {
        html! {
            <>
                <title>{"AGM 2023"}</title>
                <script src="https://js.tito.io/v2" async=true></script>
                <tito-widget event="lu-compsoc/agm-2023"></tito-widget>
            </>
        }
    }
}
