use futures::future;
use ohaizac_dev::handle_rejection;
use warp::Filter;

#[tokio::main]
async fn main() {
    let index = warp::path::end().and(warp::fs::file("./pages/index.html"));
    let about = warp::path!("about").and(warp::fs::file("./pages/about.html"));
    let contact = warp::path!("contact").and(warp::fs::file("./pages/contact.html"));
    let projects = warp::path!("projects").and(warp::fs::file("./pages/projects.html"));
    let more = warp::path!("...").and(warp::fs::file("./pages/more.html"));

    let public = warp::any().and(warp::fs::dir("./public/"));

    let router = warp::any()
        .and(index.or(about).or(contact).or(projects).or(more))
        .or(public)
        .recover(handle_rejection);

    let main = warp::serve(router).run(([127, 0, 0, 1], 3030));

    let index = warp::path::end().and(warp::fs::file("./pages/card.html"));
    let public = warp::any().and(warp::fs::dir("./public/"));

    let card = warp::serve(index.or(public)).run(([127, 0, 0, 1], 3031));

    future::join(main, card).await;
}
