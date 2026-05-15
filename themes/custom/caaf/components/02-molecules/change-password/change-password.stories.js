import changePassword from "./change-password.twig";
import data from "./change-password.yml";
import "./change-password.css";
import "./change-password.js";
/**
 * Storybook Definition.
 */
export default { title: "Molecules/Change Password" };

export const changePasswordForm = () => {
  window.setTimeout(() => window.changePasswordInit?.(), 0);
  return changePassword(data);
};
