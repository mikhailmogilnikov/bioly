(async () => {
  await new Promise((resolve, reject) => {
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = "/css/squircle.css";
    link.onload = () => {
      setTimeout(() => {
        const tempStyle = document.createElement("style");

        tempStyle.textContent =
          ".temp-squircle { background: paint(squircle); }";
        document.head.appendChild(tempStyle);
        setTimeout(() => {
          document.head.removeChild(tempStyle);
        }, 10);

        window.dispatchEvent(new Event("resize"));

        resolve();
      }, 50);
    };
    link.onerror = () => reject(new Error("Failed to load CSS"));
    document.head.appendChild(link);
  });

  if (!("paintWorklet" in CSS)) {
    await import("/scripts/css-paint-polyfill.js");

    await new Promise((resolve) => {
      const checkPaintWorklet = () => {
        if (CSS.paintWorklet?.addModule) {
          resolve();
        } else {
          setTimeout(checkPaintWorklet, 50);
        }
      };

      checkPaintWorklet();
    });
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

    for (const delay of [100, 300, 500]) {
      setTimeout(() => {
        const squircleElements = document.querySelectorAll(
          ".squircle, .squircle-outline, .squircle-shadow"
        );

        for (const element of squircleElements) {
          const originalTransform = element.style.transform;

          element.style.transform = "translateZ(0)";
          requestAnimationFrame(() => {
            element.style.transform = originalTransform;
          });
        }
      }, delay);
    }
  } catch (error) {
    console.warn("Failed to load squircle paintWorklet:", error);
    setTimeout(async () => {
      try {
        await CSS.paintWorklet.addModule("/scripts/squircle.min.js");
        removeBorderRadius();
      } catch (retryError) {
        console.error(
          "Failed to load squircle paintWorklet on retry:",
          retryError
        );
      }
    }, 200);
  }
})();
