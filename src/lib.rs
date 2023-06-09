use serde::Deserialize;

pub mod routes;
pub mod templates;

#[derive(Clone, Deserialize)]
#[allow(dead_code)]
struct ProjectLink {
    url: String,
    text: String,
}

#[derive(Clone, Deserialize)]
#[allow(dead_code)]
pub struct Project {
    name: String,
    tag: String,
    year: String,
    lang: String,
    showcase: Option<String>,
    demo: Option<String>,
    description: Option<String>,
    git: Option<String>,
    link: Option<ProjectLink>,
}

pub struct AppState {
    pub projects: templates::Projects,
}
