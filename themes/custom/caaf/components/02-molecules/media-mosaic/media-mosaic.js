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

  const initMediaMosaic = (context = document) => {
    runOnce(
      "media-mosaic-favorite",
      "[data-media-mosaic-favorite]",
      context,
    ).forEach((button) => {
      button.addEventListener("click", () => {
        const isFavorite = button.getAttribute("aria-pressed") === "true";
        const nextState = !isFavorite;

        button.setAttribute("aria-pressed", String(nextState));
        button.setAttribute(
          "aria-label",
          nextState ? button.dataset.labelRemove : button.dataset.labelAdd,
        );
        button.classList.toggle("is-active", nextState);
      });
    });
  };

  window.mediaMosaicInit = initMediaMosaic;

  if (window.Drupal) {
    window.Drupal.behaviors.mediaMosaic = {
      attach: initMediaMosaic,
    };
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initMediaMosaic());
  } else {
    initMediaMosaic();
  }
})(window, document);
