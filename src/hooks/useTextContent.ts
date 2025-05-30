import { useState, useCallback, useEffect } from "react";
import { TextContent } from "../types";
import { contentManager } from "../services/ContentManager";

export const useTextContent = () => {
  const [content, setContent] = useState<TextContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(
    async (
      category: string,
      difficulty: TextContent["difficulty"] = "medium"
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const newContent = await contentManager.getContent(
          category,
          difficulty
        );
        setContent(newContent);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch content"
        );
        console.error("Error fetching content:", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearContent = useCallback(() => {
    setContent(null);
    setError(null);
  }, []);

  // Clear content when component unmounts
  useEffect(() => {
    return () => {
      clearContent();
    };
  }, [clearContent]);

  return {
    content,
    isLoading,
    error,
    fetchContent,
    clearContent,
  };
};
