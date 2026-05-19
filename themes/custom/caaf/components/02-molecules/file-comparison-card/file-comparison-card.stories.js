import fileComparisonCard from "./file-comparison-card.twig";
import data from "./file-comparison-card.yml";
import "./file-comparison-card.css";

/**
 * Storybook Definition.
 */
export default { title: "Molecules/File Comparison Card" };

export const card = () => fileComparisonCard(data);
