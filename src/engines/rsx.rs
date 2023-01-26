use rocket::http::ContentType;
use yew::{prelude::*, ServerRenderer};

pub use yew::prelude::{function_component, Html, html};

pub async fn render<COMPONENT>() -> (ContentType, String)
where
    COMPONENT: BaseComponent,
    COMPONENT::Properties: Default
{
    let mut buff = String::new();
    ServerRenderer::<COMPONENT>::default().render_to_string(&mut buff).await;
    (ContentType::HTML, buff)
}
