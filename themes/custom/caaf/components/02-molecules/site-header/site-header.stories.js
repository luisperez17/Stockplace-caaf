import siteHeader from "./site-header.twig";
import data from "./site-header.yml";
import "./site-header.css";
/**
 * Storybook Definition.
 */
export default { title: "Molecules/Site Header" };

export const anonymous = () => siteHeader(data);

export const authenticated = () =>
  siteHeader({
    ...data,
    is_logged_in: true,
  });
