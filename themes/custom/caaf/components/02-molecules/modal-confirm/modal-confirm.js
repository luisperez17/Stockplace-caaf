((window, document) => {
  const fallbackOnce = (id, selector, context = document) => {
    const attribute = `data-once-${id}`;

    return Array.from(context.querySelectorAll(selector)).filter((element) => {
      if (element.hasAttribute(attribute)) {
        return false;
      }

      element.setAttribute(attribute, "true");
      return true;
    });
  };

  const runOnce = window.once || fallbackOnce;

  const initModalConfirm = (context = document) => {
    runOnce("modal-confirm", "[data-modal-confirm]", context).forEach((modal) => {
      const dialog = modal.querySelector(".modal-confirm__dialog");
      const modalId = modal.id;
      const closeButtons = modal.querySelectorAll("[data-modal-confirm-close]");
      let previousFocus = null;

      const openModal = () => {
        previousFocus = document.activeElement;
        modal.hidden = false;
        modal.classList.add("is-open");
        dialog?.focus();
      };

      const closeModal = () => {
        modal.classList.remove("is-open");
        modal.hidden = true;

        if (previousFocus && typeof previousFocus.focus === "function") {
          previousFocus.focus();
        }
      };

      closeButtons.forEach((button) => {
        button.addEventListener("click", closeModal);
      });

      modal.modalConfirmOpen = openModal;
      modal.modalConfirmClose = closeModal;

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
          closeModal();
        }
      });

      if (modalId) {
        runOnce(
          `modal-confirm-open-${modalId}`,
          `[data-modal-confirm-open="${modalId}"]`,
          context,
        ).forEach((trigger) => {
          trigger.addEventListener("click", (event) => {
            event.preventDefault();
            openModal();
          });
        });
      }
    });
  };

  window.modalConfirmInit = initModalConfirm;

  if (window.Drupal) {
    window.Drupal.behaviors.modalConfirm = {
      attach: initModalConfirm,
    };
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initModalConfirm());
  } else {
    initModalConfirm();
  }
})(window, document);
