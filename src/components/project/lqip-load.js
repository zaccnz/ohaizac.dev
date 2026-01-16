const setupImage = () => {
  const image = document.querySelector(`.showcase-img-${slug}`);
  if (!image) return;

  image.classList.remove("loaded");
  image.parentElement.classList.remove("has-transition");

  if (image.complete && image.naturalWidth > 0) {
    image.classList.add("loaded");
  } else {
    const start = performance.now();
    image.onload = () => {
      const now = performance.now();
      if (now - start > 200) {
        image.parentElement.classList.add("has-transition");
      }
      image.classList.add("loaded");
    };
  }
};

setupImage();
document.addEventListener("astro:page-load", setupImage);
