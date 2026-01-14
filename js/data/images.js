const images = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  src: `img${index + 1}.avif`,
  alt: "Minimalist flowers and bouquets from our flower shop Betty Bouquets",
}));

export default images;
