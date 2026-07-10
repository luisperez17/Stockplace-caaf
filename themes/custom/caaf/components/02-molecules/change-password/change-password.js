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

  const setMessage = (input, text, isError = false) => {
    const field = input.closest("[data-change-password-field]");
    const message = field?.querySelector("[data-form-input-message]");

    input.classList.toggle("is-invalid", isError);
    input.setAttribute("aria-invalid", isError ? "true" : "false");

    if (message) {
      message.textContent = text || "";
      message.classList.toggle("is-error", isError);
    }
  };

  const initChangePassword = (context = document) => {
    runOnce("change-password", "[data-change-password]", context).forEach((form) => {
      const config = form.dataset;
      const mainInput = form.querySelector("[data-change-password-main]");
      const confirmInput = form.querySelector("[data-change-password-confirm]");
      const inputs = Array.from(form.querySelectorAll("[data-password-input]"));
      const strength = form.querySelector("[data-password-strength]");
      const strengthBar = strength?.querySelector("[data-password-strength-bar]");
      const strengthLabel = strength?.querySelector("[data-password-strength-label]");

      const updateStrength = (value) => {
        if (strength) strength.hidden = !value;
        let score = 0;
        if (value.length >= 8) score += 1;
        if (value.length >= 12) score += 1;
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
        if (/\d/.test(value)) score += 1;
        if (/[^A-Za-z0-9]/.test(value)) score += 1;
        const levels = value ? ["muy débil", "débil", "media", "fuerte", "muy fuerte"] : ["sin contraseña"];
        const index = value ? Math.min(Math.max(score - 1, 0), 4) : 0;
        if (strength) strength.dataset.level = value ? String(index + 1) : "0";
        if (strengthBar) strengthBar.style.width = value ? `${(index + 1) * 20}%` : "0";
        if (strengthLabel) strengthLabel.textContent = `Fortaleza: ${levels[index]}`;
      };

      const validateInput = (input) => {
        const value = input.value.trim();
        const minLength = Number(input.getAttribute("minlength")) || 8;

        if (!value) {
          setMessage(input, config.messageRequired || "Este campo es obligatorio.", true);
          return false;
        }

        if (value.length < minLength) {
          setMessage(input, config.messageMinLength || `La contraseña debe tener mínimo ${minLength} caracteres`, true);
          return false;
        }

        if (input === confirmInput && mainInput?.value && value !== mainInput.value.trim()) {
          setMessage(input, config.messageMatch || "Las contraseñas no coinciden.", true);
          return false;
        }

        setMessage(input, input.dataset.initialMessage || "", false);
        return true;
      };

      inputs.forEach((input) => {
        const message = input.closest("[data-change-password-field]")?.querySelector("[data-form-input-message]");
        input.dataset.initialMessage = message?.textContent?.trim() || "";

        input.addEventListener("blur", () => validateInput(input));
        input.addEventListener("input", () => {
          if (input === mainInput) updateStrength(input.value);
          if (input.classList.contains("is-invalid")) {
            validateInput(input);
          }

          if (input === mainInput && confirmInput?.value) {
            validateInput(confirmInput);
          }
        });
      });

      updateStrength(mainInput?.value || "");

      form.addEventListener("submit", (event) => {
        const results = inputs.map((input) => validateInput(input));
        const isValid = results.every(Boolean);

        if (!isValid) {
          event.preventDefault();
        }
      });
    });
  };

  window.changePasswordInit = initChangePassword;

  if (window.Drupal) {
    window.Drupal.behaviors.changePassword = {
      attach: initChangePassword,
    };
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initChangePassword());
  } else {
    initChangePassword();
  }
})(window, document);
