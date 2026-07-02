((window, document) => {
  const init = (context = document) => {
    context.querySelectorAll("[data-password-toggle]:not([data-toggle-ready])").forEach((button) => {
      button.dataset.toggleReady = "true";
      button.addEventListener("click", () => {
        const input = button.closest(".form-input__control")?.querySelector("[data-password-input]");
        if (!input) return;
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        button.classList.toggle("is-visible", show);
        button.setAttribute("aria-pressed", show ? "true" : "false");
        button.setAttribute("aria-label", show ? "Ocultar contraseña" : "Mostrar contraseña");
      });
    });
  };
  if (window.Drupal) window.Drupal.behaviors.formInput = { attach: init };
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init());
  else init();
})(window, document);
