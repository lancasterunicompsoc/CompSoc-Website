use proc_macro::{TokenStream, TokenTree};
use quote::{quote, format_ident, ToTokens};
use syn;

#[proc_macro_attribute]
pub fn component_route(attr: TokenStream, item: TokenStream) -> TokenStream {
    let mut iter = attr.into_iter();
    let method_string = iter.next().expect("No method was provided").to_string();
    iter.next().expect("Must provide a method, path, and component name");
    let raw_path = iter.next().expect("No path was provided").to_string();
    iter.next().expect("Must provide a method, path, and component name");
    let component_name_string = match iter.next().expect("No path was provided") {
        TokenTree::Ident(name) => name.to_string(),
        _ => panic!("Expected component_name to be an identifier"),
    };

    let ast: syn::ItemFn = syn::parse(item).unwrap();
    let name = &ast.sig.ident;
    let body = &ast.block;
    let method = format_ident!("{}", method_string);
    let component_name = format_ident!("{}", component_name_string);
    let component_function_name = format_ident!("{}_component", component_name_string);
    let mut raw_path_iter = raw_path.chars();
    raw_path_iter.next();
    let path = raw_path_iter.take(raw_path.len() - 2).collect::<String>();

    let generated = quote! {
        #[function_component(#component_name)]
        fn #component_function_name() -> Html {
            #body
        }

        #[#method(#path)]
        async fn #name() -> (ContentType, String) {
            (ContentType::HTML, render::<#component_name>().await)
        }
    };

    generated.into()
}


#[proc_macro_attribute]
pub fn router(attr: TokenStream, item: TokenStream) -> TokenStream {
    let mut iter = attr.into_iter();
    let raw_base_path = iter.next().expect("No path was provided").to_string();
    let mut raw_base_path_iter = raw_base_path.chars();
    raw_base_path_iter.next();
    let base_path = raw_base_path_iter.take(raw_base_path.len() - 2).collect::<String>();

    let module: syn::ItemMod = syn::parse(item).unwrap();
    let (_, items) = &module.content.expect("A router must define one or more routes");
    let route_handler_names: Vec<_> = items.iter()
        .filter_map(|item| match item {
            syn::Item::Fn(f) => Some(f),
            _ => None
        })
        .map(|f| &f.sig.ident)
        .collect();
    
    let router_name = &module.ident;

    let module_contents: Vec<_> = items.iter()
        .filter(|item| match item {
            syn::Item::Use(_) => false,
            _ => true,
        })
        .map(|item| item.to_token_stream()).collect();

    let generated = quote!{
        #(#module_contents)*

        pub struct #router_name;

        impl RouteProvider for #router_name {
            fn base_url() -> &'static str {
                #base_path
            }

            fn routes() -> Vec<Route> {
                routes![#(#route_handler_names,)*]
            }
        }
    };
    generated.into()
}
