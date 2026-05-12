import aboutStockplace from "./about-stockplace.twig";
import data from "./about-stockplace.yml";
import "./about-stockplace.css";
/**
 * Storybook Definition.
 */
export default { title: "Molecules/About Stockplace" };

export const about = () => aboutStockplace(data);
