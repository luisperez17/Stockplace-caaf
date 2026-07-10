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

  const setMessage = (input, text = "") => {
    const field = input.closest("[data-personalized-advice-field]");
    const message = field?.querySelector("[data-personalized-advice-message]");
    const isInvalid = Boolean(text);

    input.classList.toggle("is-invalid", isInvalid);
    input.setAttribute("aria-invalid", isInvalid ? "true" : "false");

    if (message) {
      message.textContent = text;
    }
  };

  const clearInput = (input) => {
    setMessage(input, "");
    input.setAttribute("aria-invalid", "false");
  };

  const getSelectedOptionKey = (select) => {
    const option = select?.selectedOptions?.[0];

    return option?.dataset.optionId || option?.value || "";
  };

  const updateNotificationRecipient = (form) => {
    const recipient = form.querySelector("[data-notification-recipient]");
    const axis = form.querySelector('[name="procolombia_axis"]');
    const selectedOption = axis?.selectedOptions?.[0];

    if (recipient) {
      recipient.value = selectedOption?.dataset.notificationEmail || "";
    }
  };

  const inputIsComplete = (input) => {
    const value = input.value.trim();
    const minLength = Number(input.getAttribute("minlength")) || 0;

    if (input.disabled) {
      return true;
    }

    if (input.required && !value) {
      return false;
    }

    if (!value) {
      return true;
    }

    if (minLength && value.length < minLength) {
      return false;
    }

    return input.validity.valid;
  };

  const updateSubmitState = (form) => {
    const submit = form.querySelector("[data-personalized-advice-submit]");
    const inputs = Array.from(form.querySelectorAll("[data-personalized-advice-input]"));
    const terms = form.querySelector("[data-personalized-advice-terms]");
    const fieldsAreComplete = inputs.every(inputIsComplete);
    const termsAreComplete = Boolean(!terms?.required || terms.checked);

    if (submit) {
      submit.disabled = !(fieldsAreComplete && termsAreComplete);
    }
  };

  const openSuccessModal = (form) => {
    const modal = form
      .closest(".personalized-advice")
      ?.querySelector("[data-modal-confirm]");

    if (!modal) {
      return;
    }

    if (typeof modal.modalConfirmOpen === "function") {
      modal.modalConfirmOpen();
      return;
    }

    modal.hidden = false;
    modal.classList.add("is-open");
    modal.querySelector(".modal-confirm__dialog")?.focus();
  };

  const syncConditionalFields = (form) => {
    const sourceName = form.dataset.conditionalSource;
    const trigger = form.dataset.conditionalTrigger;
    const source = sourceName
      ? form.querySelector(`[name="${sourceName}"]`)
      : null;
    const selectedKey = getSelectedOptionKey(source);
    const isActive = Boolean(trigger && selectedKey === trigger);

    form.querySelectorAll("[data-conditional-group]").forEach((field) => {
      const shouldEnable = field.dataset.conditionalGroup === trigger && isActive;

      field.hidden = !shouldEnable;
      field.querySelectorAll("input, select, textarea").forEach((input) => {
        input.disabled = !shouldEnable;

        if (input.hasAttribute("data-personalized-advice-input")) {
          input.required = shouldEnable && input.dataset.requiredWhenActive === "true";
        }

        if (!shouldEnable && input.hasAttribute("data-personalized-advice-input")) {
          clearInput(input);
        }
      });
    });

    updateNotificationRecipient(form);
    updateSubmitState(form);
  };

  const getFieldMessage = (form, input) => {
    const value = input.value.trim();
    const minLength = Number(input.getAttribute("minlength")) || 0;
    const requiredMessage = form.dataset.messageRequired || "Este campo es obligatorio.";

    if (input.required && !value) {
      return input.tagName === "SELECT"
        ? form.dataset.messageSelect || requiredMessage
        : requiredMessage;
    }

    if (value && input.type === "email" && input.validity.typeMismatch) {
      return form.dataset.messageEmail || "Ingresa un correo válido.";
    }

    if (value && minLength && value.length < minLength) {
      return input.dataset.messageMinlength || `Escribe mínimo ${minLength} caracteres.`;
    }

    if (value && input.validity.patternMismatch) {
      return input.dataset.messagePattern || "Revisa el formato de este campo.";
    }

    return "";
  };

  const validateInput = (form, input) => {
    if (input.disabled) {
      clearInput(input);
      return true;
    }

    const message = getFieldMessage(form, input);
    setMessage(input, message);

    return !message;
  };

  const validateTerms = (form) => {
    const terms = form.querySelector("[data-personalized-advice-terms]");
    const message = form.querySelector("[data-personalized-advice-terms-message]");
    const isInvalid = Boolean(terms?.required && !terms.checked);

    terms?.classList.toggle("is-invalid", isInvalid);
    terms?.setAttribute("aria-invalid", isInvalid ? "true" : "false");

    if (message) {
      message.textContent = isInvalid
        ? form.dataset.messageTerms || "Debes aceptar los términos y condiciones."
        : "";
    }

    return !isInvalid;
  };

  const initPersonalizedAdvice = (context = document) => {
    runOnce("personalized-advice", "[data-personalized-advice]", context).forEach((form) => {
      const inputs = Array.from(form.querySelectorAll("[data-personalized-advice-input]"));
      const terms = form.querySelector("[data-personalized-advice-terms]");
      const conditionalSource = form.dataset.conditionalSource
        ? form.querySelector(`[name="${form.dataset.conditionalSource}"]`)
        : null;
      const axis = form.querySelector('[name="procolombia_axis"]');

      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          if (input.hasAttribute("data-digits-only")) {
            input.value = input.value.replace(/\D/g, "");
          }

          if (input.classList.contains("is-invalid")) {
            validateInput(form, input);
          }

          updateSubmitState(form);
        });

        input.addEventListener("change", () => {
          if (input === axis) {
            updateNotificationRecipient(form);
          }

          if (input.classList.contains("is-invalid")) {
            validateInput(form, input);
          }

          updateSubmitState(form);
        });

        input.addEventListener("blur", () => {
          validateInput(form, input);
          updateSubmitState(form);
        });
      });

      conditionalSource?.addEventListener("change", () => syncConditionalFields(form));
      terms?.addEventListener("change", () => {
        validateTerms(form);
        updateSubmitState(form);
      });
      syncConditionalFields(form);
      updateSubmitState(form);

      form.addEventListener("submit", (event) => {
        syncConditionalFields(form);
        const fieldsAreValid = inputs.map((input) => validateInput(form, input)).every(Boolean);
        const termsAreValid = validateTerms(form);

        if (!fieldsAreValid || !termsAreValid) {
          event.preventDefault();
          updateSubmitState(form);
          return;
        }

        event.preventDefault();
        openSuccessModal(form);
      });
    });
  };

  window.personalizedAdviceInit = initPersonalizedAdvice;

  if (window.Drupal) {
    window.Drupal.behaviors.personalizedAdvice = {
      attach: initPersonalizedAdvice,
    };
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initPersonalizedAdvice());
  } else {
    initPersonalizedAdvice();
  }
})(window, document);
