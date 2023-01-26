use proc_macro::{TokenStream, TokenTree};
use quote::{quote, format_ident};
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
            render::<#component_name>().await
        }
    };

    generated.into()
}
