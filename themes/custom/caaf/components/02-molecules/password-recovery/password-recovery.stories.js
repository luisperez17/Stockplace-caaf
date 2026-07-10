import passwordRecovery from "./password-recovery.twig";
import data from "./password-recovery.yml";
import "./password-recovery.css";
import "../../01-atoms/form-input/form-input.css";
import "../../01-atoms/form-input/form-input.js";
import "../../01-atoms/button/button.css";

export default { title: "Molecules/Password recovery" };
export const Formulario = () => passwordRecovery(data);
export const Confirmacion = () => passwordRecovery({ ...data, state: "confirmation" });
export const EnlaceVencido = () => passwordRecovery({ ...data, state: "expired" });
