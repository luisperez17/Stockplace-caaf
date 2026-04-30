import button from "./footer.twig";
import data from "./footer.yml";
import "./footer.css";
/**
 * Storybook Definition.
 */
export default { title: "Molecules/Footer" };

export const footer = () => button(data);
