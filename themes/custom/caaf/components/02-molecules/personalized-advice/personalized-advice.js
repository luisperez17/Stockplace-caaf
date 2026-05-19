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

      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          if (input.hasAttribute("data-digits-only")) {
            input.value = input.value.replace(/\D/g, "");
          }

          if (input.classList.contains("is-invalid")) {
            validateInput(form, input);
          }
        });

        input.addEventListener("blur", () => validateInput(form, input));
      });

      terms?.addEventListener("change", () => validateTerms(form));

      form.addEventListener("submit", (event) => {
        const fieldsAreValid = inputs.map((input) => validateInput(form, input)).every(Boolean);
        const termsAreValid = validateTerms(form);

        if (!fieldsAreValid || !termsAreValid) {
          event.preventDefault();
        }
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
