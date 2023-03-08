use rocket::{*, http::ContentType};

use crate::engines::rsx::*;
use super::{RouteProvider, router};

#[router("/")]
mod HomeRoutes {
    #[component_route(get, "/", IndexPage)]
    fn index() -> Html {
        html! {
            <Page title="LUCompSoc" main_classes="flex flex-column">
                <div class="flex flex-column flex-grow-1 align-center justify-center clr-neutral-200 bg-clr-neutral-800">
                    <h1>
                        <pre>{"> compsoc join"}<span class="flash clr-primary-300">{"|"}</span></pre>
                    </h1>

                    <p class="max-width-50vw align-center bold">
                        {"Lancaster University Computer Science Society exists to promote interest in"}
                        {"computing and technology among students and wider society."}
                    </p>

                    <a href="https://lancastersu.co.uk/groups/computer-science-society-2c91/join" class="button">
                        {"Join the society"}
                    </a>
                </div>
            </Page>
        }
    }
}

