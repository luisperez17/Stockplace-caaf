import modalConfirm from "./modal-confirm.twig";
import data from "./modal-confirm.yml";
import "./modal-confirm.css";
import "./modal-confirm.js";
/**
 * Storybook Definition.
 */
export default { title: "Molecules/Modal Confirm" };

export const modal = () => {
  window.setTimeout(() => window.modalConfirmInit?.(), 0);
  return modalConfirm(data);
};

export const modalWithoutSecondaryButton = () => {
  window.setTimeout(() => window.modalConfirmInit?.(), 0);
  return modalConfirm({
    ...data,
    secondary_button: {},
  });
};
