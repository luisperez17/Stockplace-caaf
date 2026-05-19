import fileComparison from "./file-comparison.twig";
import data from "./file-comparison.yml";
import "../file-comparison-card/file-comparison-card.css";
import "./file-comparison.css";

/**
 * Storybook Definition.
 */
export default { title: "Molecules/File Comparison" };

export const comparison = () => fileComparison(data);
