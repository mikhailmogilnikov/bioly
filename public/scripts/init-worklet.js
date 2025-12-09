const loadPaintWorkletsOnce = () => {
  if (globalThis.__paintWorkletReady) {
    return globalThis.__paintWorkletReady;
  }

  globalThis.__paintWorkletReady = (async () => {
    const cssFiles = ["/css/squircle.css", "/css/spoiler.css"];

    for (const cssFile of cssFiles) {
      await new Promise((resolve, reject) => {
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = cssFile;

        link.onload = () => {
          resolve();
        };

        link.onerror = () => {
          reject(new Error(`Failed to load ${cssFile}`));
        };

        document.head.appendChild(link);
      });
    }

    if (!("paintWorklet" in CSS)) {
      await import("/scripts/css-paint-polyfill.js");
    }

    const removeBorderRadius = () => {
      const style = document.createElement("style");

      style.textContent =
        ".squircle, .squircle-outline, .squircle-shadow { border-radius: 0 !important; }";
      document.head.appendChild(style);
    };

    try {
      await CSS.paintWorklet.addModule("/scripts/squircle.min.js");
      removeBorderRadius();
    } catch (error) {
      console.warn("Failed to load squircle paintWorklet:", error);
    }

    try {
      await CSS.paintWorklet.addModule("/scripts/spoiler-worklet.js");
    } catch (error) {
      console.warn("Failed to load spoiler paintWorklet:", error);
    }

    return true;
  })();

  return globalThis.__paintWorkletReady;
};

loadPaintWorkletsOnce().catch((error) => {
  console.warn("paintWorklet initialization failed:", error);
});
