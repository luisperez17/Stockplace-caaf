import formInput from "./form-input.twig";
import data from "./form-input.yml";
import "./form-input.css";
import "./form-input.js";
export default { title: "Atoms/Form Input" };
export const input = () => formInput(data);
