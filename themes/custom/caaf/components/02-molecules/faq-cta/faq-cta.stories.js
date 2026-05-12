import faqCta from "./faq-cta.twig";
import data from "./faq-cta.yml";
import "./faq-cta.css";
/**
 * Storybook Definition.
 */
export default { title: "Molecules/Faq CTA" };

export const faq = () => faqCta(data);
