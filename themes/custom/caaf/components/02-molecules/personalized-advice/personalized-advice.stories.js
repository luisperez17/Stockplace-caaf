import personalizedAdvice from "./personalized-advice.twig";
import data from "./personalized-advice.yml";
import "./personalized-advice.css";
import "./personalized-advice.js";

/**
 * Storybook Definition.
 */
export default { title: "Molecules/Personalized Advice" };

export const form = () => personalizedAdvice(data);
