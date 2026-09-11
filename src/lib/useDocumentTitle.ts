import { useEffect } from "react";

const SITE_NAME = "Globcompanion";

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME}: Recipe Finder`;

    let previousDescription: string | null = null;
    const meta = document.querySelector('meta[name="description"]');
    if (description && meta) {
      previousDescription = meta.getAttribute("content");
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (description && meta && previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}
