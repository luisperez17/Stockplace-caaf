import mediaMosaic from "./media-mosaic.twig";
import defaultData from "./media-mosaic.yml";
import "./media-mosaic.css";
import "./media-mosaic.js";

const mediaPool = [
  ...defaultData.items,
  {
    bundle: "photographic",
    src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80",
    alt: "Granos de café sostenidos entre dos manos.",
    region: "Andina",
  },
  {
    bundle: "video",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    alt: "Vista previa de un video en la playa.",
    label: "Video en la playa",
    region: "Caribe",
  },
  {
    bundle: "sonoro",
    label: "Música tradicional colombiana",
    gradient: "linear-gradient(135deg, #f04d97 0%, #8b1dde 100%)",
    region: "Pacífica",
  },
  {
    bundle: "graphic",
    src: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=600&q=80",
    alt: "Gráfico de una montaña entre nubes.",
    region: "Andina",
  },
  {
    bundle: "photographic",
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=600&q=80",
    alt: "Costa y olas del océano.",
    region: "Caribe",
  },
  {
    bundle: "photographic",
    src: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=600&q=80",
    alt: "Ballenas vistas desde arriba bajo el agua.",
    region: "Pacífica",
  },
  {
    bundle: "photographic",
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    alt: "Ballena nadando bajo el agua.",
    region: "Pacífica",
  },
  {
    bundle: "sonoro",
    label: "Sonidos del océano",
    gradient: "linear-gradient(135deg, #0758b8 0%, #0c9cff 100%)",
    region: "Insular",
  },
  {
    bundle: "photographic",
    src: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=600&q=80",
    alt: "Ballena saltando sobre el mar.",
    region: "Pacífica",
  },
  {
    bundle: "photographic",
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80",
    alt: "Delfín saltando en el mar.",
    region: "Caribe",
  },
  {
    bundle: "photographic",
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
    alt: "Silueta marina bajo el agua.",
    region: "Insular",
  },
  {
    bundle: "sonoro",
    label: "Paisaje sonoro colombiano",
    gradient: "linear-gradient(135deg, #0575e6 0%, #04a6ff 100%)",
    region: "Amazonía",
  },
];

const createPage = (layout, itemCount) => ({
  ...defaultData,
  layout,
  items: mediaPool.slice(0, itemCount),
});

const renderPage = (data) => {
  window.setTimeout(() => window.mediaMosaicInit?.(), 0);
  return mediaMosaic(data);
};

/**
 * Storybook Definition.
 */
export default { title: "Molecules/Media Mosaic" };

export const twoByFour = () => renderPage(createPage("two-by-four", 8));
export const threeByFour = () => renderPage(createPage("three-by-four", 12));
export const fourByFour = () => renderPage(createPage("four-by-four", 17));
export const adaptive = () => renderPage(createPage("adaptive", 5));
export const auto = adaptive;
