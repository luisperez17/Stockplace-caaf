import personalizedAdvice from "./personalized-advice.twig";
import data from "./personalized-advice.yml";
import "../../01-atoms/form-input/form-input.css";
import "../modal-confirm/modal-confirm.css";
import "../modal-confirm/modal-confirm.js";
import "./personalized-advice.css";
import "./personalized-advice.js";

/**
 * Storybook Definition.
 */
export default { title: "Molecules/Personalized Advice" };

export const form = () => personalizedAdvice(data);
