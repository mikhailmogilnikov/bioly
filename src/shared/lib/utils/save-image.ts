/**
 * Ожидает загрузки всех изображений в элементе
 */
function waitForImages(element: HTMLElement): Promise<void> {
  const images = element.querySelectorAll("img");
  const imagePromises: Promise<void>[] = [];

  for (const img of images) {
    // Если изображение уже загружено
    if (img.complete && img.naturalHeight !== 0) {
      continue;
    }

    // Создаем Promise для каждого изображения
    const imagePromise = new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        // eslint-disable-next-line no-console
        console.warn(`Image loading timeout: ${img.src}`);
        resolve(); // Разрешаем даже при таймауте, чтобы не блокировать экспорт
      }, 10_000); // 10 секунд таймаут

      img.onload = () => {
        clearTimeout(timeout);
        resolve();
      };

      img.onerror = () => {
        clearTimeout(timeout);
        // eslint-disable-next-line no-console
        console.warn(`Image failed to load: ${img.src}`);
        resolve(); // Разрешаем даже при ошибке, чтобы не блокировать экспорт
      };

      // Если изображение уже загружено, но событие не сработало
      if (img.complete) {
        clearTimeout(timeout);
        resolve();
      }
    });

    imagePromises.push(imagePromise);
  }

  return Promise.all(imagePromises).then(() => {
    // Дополнительная небольшая задержка для гарантии рендеринга
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
  });
}

export async function saveElementAsImage(
  elementId: string,
  filename = "image.jpg"
) {
  try {
    // Динамический импорт html-to-image
    const { toJpeg } = await import("html-to-image");

    const element = document.getElementById(elementId);

    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Ждем загрузки всех изображений перед экспортом
    await waitForImages(element as HTMLElement);

    // Конвертируем элемент напрямую в JPEG
    // html-to-image использует SVG с foreignObject, что лучше сохраняет стили
    const dataUrl = await toJpeg(element, {
      quality: 1,
      pixelRatio: 3, // Высокое качество
      backgroundColor: "var(--color-background)",
      cacheBust: true, // Обходим кеш для актуальных изображений
      fetchRequestInit: {
        mode: "cors", // Разрешаем загрузку изображений с других доменов
      },
    });

    // Создаем ссылку для скачивания
    const link = document.createElement("a");

    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving image:", error);

    throw error;
  }
}
