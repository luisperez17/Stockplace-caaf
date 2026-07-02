import component from "./login-information.twig";
import data from "./login-information.yml";
import "./login-information.css";
export default { title: "Molecules/Login Information" };
export const information = () => component(data);
