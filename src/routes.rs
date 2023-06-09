use actix_files::NamedFile;
use actix_web::{get, web, Responder};

use crate::{templates::*, AppState};

#[get("/")]
pub async fn index() -> impl Responder {
    Index {}
}

#[get("/about")]
pub async fn about() -> impl Responder {
    About {}
}

#[get("/contact")]
pub async fn contact() -> impl Responder {
    Contact {}
}

#[get("/projects")]
pub async fn projects(data: web::Data<AppState>) -> impl Responder {
    data.projects.clone()
}

#[get("/...")]
pub async fn more() -> impl Responder {
    More {}
}

#[get("/cv.pdf")]
pub async fn cv() -> impl Responder {
    NamedFile::open("public/Zac Cleveland CV.pdf")
        .customize()
        .append_header(("Content-Type", "application/pdf"))
        .insert_header((
            "Content-Disposition",
            "inline; filename=\"Zac Cleveland CV.pdf\"",
        ))
}
