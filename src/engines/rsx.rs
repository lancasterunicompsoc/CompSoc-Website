use std::path::PathBuf;

use yew::{prelude::*, ServerRenderer};

pub use macros::component_route;
pub use yew::prelude::{function_component, Html, html};

pub async fn render<COMPONENT>() -> String
where
    COMPONENT: BaseComponent,
    COMPONENT::Properties: Default
{
    let mut buff = String::new();
    ServerRenderer::<COMPONENT>::default().render_to_string(&mut buff).await;
    buff
}


#[derive(Properties, PartialEq)]
pub struct PageProps {
    pub children: Children,
    pub title: String,
    pub main_classes: Option<String>,
}

#[function_component]
pub fn Page(props: &PageProps) -> Html {
    html! {
        <html lang={"en-gb"}>
            <head>
                <Meta />
                <base href="/" />
                <title>{props.title.clone()}</title>

                <Favicons />
                <SiteData />

                <Fonts />

                <Stylesheet src={PathBuf::from("/public/css/base.css")} typ={StylesheetType::CSS} />
            </head>

            <body>
                <main class={props.main_classes.clone()}>
                    {for props.children.iter()}
                </main>
            </body>
        </html>
    }
}

#[function_component]
fn Meta() -> Html {
    html! {
        <>
            <meta charset={"utf-8"} />
            <meta http-equiv={"X-UA-Compatible"} content={"IE=edge"} />
            <meta name={"viewport"} content={"width=device-width,initial-scale=1.0"} />
        </>
    }
}

#[function_component]
fn Favicons() -> Html {
    html! {
        <>
            <link rel={"shortcut icon"} href={"public/img/favicon.ico"} />
            <link rel={"icon"} type={"image/png"} sizes={"32x32"} href={"public/img/favicon-32x32.png"} />
            <link rel={"icon"} type={"image/png"} sizes={"16x16"} href={"public/img/favicon-16x16.png"} />
        </>
    }
}

#[function_component]
fn SiteData() -> Html {
    html! {
        <>
            <meta name="theme-color" content="#006a89" />

            <meta name="msapplication-TileColor" content="#006a89" />
            <meta name="msapplication-config" content="public/img/browserconfig.xml" />

            <link rel="apple-touch-icon" sizes="180x180" href="public/img/apple-touch-icon-180x180.png" />
            <link rel="mask-icon" href="public/img/safari-pinned-tab.svg" color="#006a89" />
        </>
    }
}

#[function_component]
fn Fonts() -> Html {
    html! {
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;600;700&family=Open+Sans:ital,wght@0,400;0,600;0,800;1,300;1,400&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css" />
        </>
    }
}


#[derive(PartialEq)]
pub enum StylesheetType {
    CSS,
    SCSS,
}

#[derive(Properties, PartialEq)]
pub struct StylesheetProps {
    pub typ: StylesheetType,
    pub src: PathBuf,
}

#[function_component]
pub fn Stylesheet(props: &StylesheetProps) -> Html {
    let href = match props.typ {
        StylesheetType::CSS => props.src.to_str().expect("Invalid stylesheet path").to_owned(),
        StylesheetType::SCSS => todo!("convert SCSS path to CSS path"),
    };
    html! {
        <link rel="stylesheet" href={href} />
    }
}

