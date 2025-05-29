import { TextContent } from "../types";
import { QuoteAPI, LoremAPI, WikiAPI, WordsAPI, CodeAPI } from "./api";

export class ContentManager {
  private static instance: ContentManager;
  private cache: Map<string, { content: TextContent; timestamp: number }>;
  private readonly cacheExpiry = 30 * 60 * 1000; // 30 minutes
  private readonly apis = {
    quotes: new QuoteAPI(),
    lorem: new LoremAPI(),
    wiki: new WikiAPI(),
    words: new WordsAPI(),
    code: new CodeAPI(),
  };

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  private getCacheKey(category: string, difficulty: string): string {
    return `${category}-${difficulty}-${Math.floor(
      Date.now() / this.cacheExpiry
    )}`;
  }

  private getFromCache(key: string): TextContent | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.content;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, content: TextContent): void {
    this.cache.set(key, { content, timestamp: Date.now() });
  }

  private getFallbackContent(
    category: string,
    difficulty: TextContent["difficulty"]
  ): TextContent {
    const fallbacks: Record<string, TextContent[]> = {
      quotes: [
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty,
          content:
            "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
          author: "Steve Jobs",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "quotes",
          difficulty,
          content:
            "Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish, and never stop learning.",
          author: "Steve Jobs",
          source: "Fallback Content",
        },
      ],
      programming: [
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty,
          content:
            "function calculateWPM(characters, minutes) { return Math.round(characters / 5 / minutes); }",
          source: "Fallback Content",
        },
        {
          id: crypto.randomUUID(),
          category: "programming",
          difficulty,
          content:
            "const users = await fetch('/api/users').then(response => response.json()).catch(error => console.error(error));",
          source: "Fallback Content",
        },
      ],
      practice: [
        {
          id: crypto.randomUUID(),
          category: "practice",
          difficulty,
          content:
            "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is perfect for typing practice.",
          source: "Fallback Content",
        },
      ],
    };

    const categoryFallbacks = fallbacks[category] || fallbacks.quotes;
    return categoryFallbacks[
      Math.floor(Math.random() * categoryFallbacks.length)
    ];
  }

  async getContent(
    category: string,
    difficulty: TextContent["difficulty"] = "medium"
  ): Promise<TextContent> {
    const cacheKey = this.getCacheKey(category, difficulty);
    const cachedContent = this.getFromCache(cacheKey);
    if (cachedContent) return cachedContent;

    try {
      let content: TextContent;

      switch (category) {
        case "quotes":
          content = await this.apis.quotes.getRandomQuote(difficulty);
          break;
        case "practice":
          content = await this.apis.lorem.getText(
            this.getSentenceCount(difficulty)
          );
          break;
        case "educational":
          content = await this.apis.wiki.getContent();
          break;
        case "words":
          content = await this.apis.words.getRandomWords(
            this.getWordCount(difficulty)
          );
          break;
        case "programming":
          content = await this.apis.code.getCodeSnippet(difficulty);
          break;
        default:
          content = await this.apis.quotes.getRandomQuote(difficulty);
      }

      this.setCache(cacheKey, content);
      return content;
    } catch (error) {
      console.warn(`API failed for ${category}, using fallback:`, error);
      return this.getFallbackContent(category, difficulty);
    }
  }

  private getSentenceCount(difficulty: TextContent["difficulty"]): number {
    const counts = { easy: 3, medium: 5, hard: 8 };
    return counts[difficulty] || 5;
  }

  private getWordCount(difficulty: TextContent["difficulty"]): number {
    const counts = { easy: 20, medium: 50, hard: 100 };
    return counts[difficulty] || 50;
  }

  async getDailyContent(
    date: string = new Date().toISOString().split("T")[0]
  ): Promise<TextContent> {
    const categories = ["quotes", "educational", "programming"];
    const dayOfYear = Math.floor(
      (new Date(date).getTime() -
        new Date(new Date(date).getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const category = categories[dayOfYear % categories.length];
    return this.getContent(category, "medium");
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const contentManager = ContentManager.getInstance();
