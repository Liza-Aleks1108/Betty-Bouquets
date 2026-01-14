import images from "./data/images.js";

const gallery = document.getElementById("gallery");

images.forEach(({ src, alt }) => {
  const img = document.createElement("img");
  img.src = `assets/images/${src}`;
  img.alt = alt;
  img.loading = "lazy";

  gallery.appendChild(img);
});
