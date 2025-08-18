/**
 * Утилита для скачивания файлов
 */

/**
 * Скачивает файл по указанному пути
 * @param {string} filePath - путь к файлу
 * @param {string} fileName - имя файла для скачивания
 * @param {boolean} openInNewTab - открыть в новой вкладке
 */
export const downloadFile = (filePath, fileName, openInNewTab = false) => {
  try {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;

    if (openInNewTab) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error:", error);

    // Fallback: открываем в новой вкладке
    try {
      window.open(filePath, "_blank", "noopener,noreferrer");
    } catch (fallbackError) {
      console.error("Fallback don't work", fallbackError);
    }
  }
};

/**
 * Скачивает Privacy Policy PDF
 */
export const downloadPrivacyPolicy = () => {
  downloadFile("/privacy-policy.pdf", "Syndicate-Privacy-Policy.pdf", true);
};
