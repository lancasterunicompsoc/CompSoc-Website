use rocket::{*, http::ContentType};
use rocket_dyn_templates::{Template, context};
use yew::{prelude::*, ServerRenderer};

use super::RouteProvider;


#[get("/")]
fn index() -> Template {
    Template::render("index", context!{title: "LU CSS"})
}

#[function_component(JSX)]
fn jsx_component() -> Html {
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

#[get("/jsx")]
async fn jsx() -> (ContentType, String) {
    let mut buff = String::new();
    ServerRenderer::<JSX>::new().render_to_string(&mut buff).await;
    (ContentType::HTML, buff)
}


pub struct HomeRoutes;

impl RouteProvider for HomeRoutes {
    fn base_url() -> &'static str {
        "/"
    }

    fn routes() -> Vec<Route> {
        routes![index, jsx]
    }
}
