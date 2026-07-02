import button from "./button.twig";
import data from "./button.yml";
import "./button.css";
export default { title: "Atoms/Button" };
export const primary = () => button(data);
