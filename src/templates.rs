use crate::Project;
use askama::Template;
use serde::Deserialize;

#[derive(Template)]
#[template(path = "index.html")]
pub struct Index {}

#[derive(Template)]
#[template(path = "about.html")]
pub struct About {}

#[derive(Template)]
#[template(path = "contact.html")]
pub struct Contact {}

#[derive(Clone, Template, Deserialize)]
#[template(path = "projects.html")]
#[allow(dead_code)]
pub struct Projects {
    projects: Vec<Project>,
}

#[derive(Template)]
#[template(path = "more.html")]
pub struct More {}

#[derive(Template)]
#[template(path = "error.html")]
pub struct Error {
    pub title: String,
    pub code: u16,
    pub description: String,
}
