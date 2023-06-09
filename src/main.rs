use actix_web::{
    dev,
    http::header,
    middleware::{self, ErrorHandlerResponse},
    web, App, HttpServer,
};
use std::io::{Error, ErrorKind};

use ohaizac_dev::{
    routes::*,
    templates::{Error as ErrorPage, Projects},
    AppState,
};

fn error_handler<B>(res: dev::ServiceResponse<B>) -> actix_web::Result<ErrorHandlerResponse<B>> {
    let (req, res) = res.into_parts();
    let status = res.status();

    let mut res = res
        .set_body(
            ErrorPage {
                title: status
                    .canonical_reason()
                    .map(|s| s.to_string().to_ascii_lowercase())
                    .unwrap_or("unknown error".to_string()),
                code: status.as_u16(),
                description: "oops!".to_string(),
            }
            .to_string(),
        )
        .map_into_boxed_body();

    res.headers_mut().insert(
        header::CONTENT_TYPE,
        header::HeaderValue::from_static("text/html"),
    );

    let res = dev::ServiceResponse::new(req, res).map_into_right_body();
    Ok(ErrorHandlerResponse::Response(res))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let proj: Projects = match toml::from_str(include_str!("projects.toml")) {
        Ok(proj) => proj,
        Err(error) => return Err(Error::new(ErrorKind::InvalidData, error)),
    };

    HttpServer::new(move || {
        App::new()
            .wrap(middleware::NormalizePath::default())
            .wrap(middleware::ErrorHandlers::new().default_handler(error_handler))
            .app_data(web::Data::new(AppState {
                projects: proj.clone(),
            }))
            .service(index)
            .service(about)
            .service(contact)
            .service(projects)
            .service(more)
            .service(cv)
            .service(actix_files::Files::new("/", "./public/"))
    })
    .bind(("0.0.0.0", 3030))?
    .run()
    .await
}
