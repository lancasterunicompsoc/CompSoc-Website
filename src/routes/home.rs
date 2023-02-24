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

    #[component_route(get, "/jsx", JSX)]
    fn jsx() -> Html {
        let component = html! { <div id="component">{"Some component"}</div> };

        let text_var = "You can interpolate text variables";

        html! {
           <div>
              {"You can type text right into the elements"}
              { component }
              { text_var }
           </div>
        }
    }
}
