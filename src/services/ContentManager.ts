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
    // Only use categories defined in TextContent["category"]
    const fallbackByDifficulty: Record<
      TextContent["difficulty"],
      Record<"quotes" | "programming" | "literature" | "news", TextContent[]>
    > = {
      easy: {
        quotes: [
          {
            id: crypto.randomUUID(),
            category: "quotes",
            difficulty: "easy",
            content: "Stay hungry, stay foolish.",
            author: "Steve Jobs",
            source: "Fallback Content",
          },
          {
            id: crypto.randomUUID(),
            category: "quotes",
            difficulty: "easy",
            content: "Simplicity is the ultimate sophistication.",
            author: "Leonardo da Vinci",
            source: "Fallback Content",
          },
        ],
        programming: [
          {
            id: crypto.randomUUID(),
            category: "programming",
            difficulty: "easy",
            content: "let x = 5; // A simple variable",
            source: "Fallback Content",
          },
        ],
        literature: [
          {
            id: crypto.randomUUID(),
            category: "literature",
            difficulty: "easy",
            content: "Call me Ishmael.",
            author: "Herman Melville",
            source: "Fallback Content",
          },
        ],
        news: [
          {
            id: crypto.randomUUID(),
            category: "news",
            difficulty: "easy",
            content: "Breaking news: The sun rises in the east.",
            source: "Fallback Content",
          },
        ],
      },
      medium: {
        quotes: [
          {
            id: crypto.randomUUID(),
            category: "quotes",
            difficulty: "medium",
            content:
              "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
            author: "Steve Jobs",
            source: "Fallback Content",
          },
        ],
        programming: [
          {
            id: crypto.randomUUID(),
            category: "programming",
            difficulty: "medium",
            content:
              "function calculateWPM(characters, minutes) { return Math.round(characters / 5 / minutes); }",
            source: "Fallback Content",
          },
        ],
        literature: [
          {
            id: crypto.randomUUID(),
            category: "literature",
            difficulty: "medium",
            content:
              "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness...",
            author: "Charles Dickens",
            source: "Fallback Content",
          },
        ],
        news: [
          {
            id: crypto.randomUUID(),
            category: "news",
            difficulty: "medium",
            content:
              "In today's headlines, scientists have discovered a new species of bird in the Amazon rainforest, highlighting the region's rich biodiversity.",
            source: "Fallback Content",
          },
        ],
      },
      hard: {
        quotes: [
          {
            id: crypto.randomUUID(),
            category: "quotes",
            difficulty: "hard",
            content:
              "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. The journey of a thousand miles begins with one step. Perseverance is not a long race; it is many short races one after the other.",
            author: "Albert Schweitzer & Lao Tzu",
            source: "Fallback Content",
          },
        ],
        programming: [
          {
            id: crypto.randomUUID(),
            category: "programming",
            difficulty: "hard",
            content:
              "function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; } // Debounce implementation for performance.",
            source: "Fallback Content",
          },
        ],
        literature: [
          {
            id: crypto.randomUUID(),
            category: "literature",
            difficulty: "hard",
            content:
              "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood...",
            author: "Jane Austen",
            source: "Fallback Content",
          },
        ],
        news: [
          {
            id: crypto.randomUUID(),
            category: "news",
            difficulty: "hard",
            content:
              "In a groundbreaking development, international researchers have unveiled a new technology that promises to revolutionize renewable energy production, potentially reducing global carbon emissions by 40% over the next decade.",
            source: "Fallback Content",
          },
        ],
      },
    };
    // Map unsupported categories to 'quotes' as fallback
    const validCategories = ["quotes", "programming", "literature", "news"];
    const difficultyKey = (
      difficulty in fallbackByDifficulty ? difficulty : "medium"
    ) as TextContent["difficulty"];
    const categoryKey = (
      validCategories.includes(category) ? category : "quotes"
    ) as keyof (typeof fallbackByDifficulty)["easy"];
    const categoryFallbacks = fallbackByDifficulty[difficultyKey][categoryKey];
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
            this.getSentenceCount(difficulty),
            difficulty
          );
          break;
        case "educational":
          content = await this.apis.wiki.getContent();
          break;
        case "words":
          content = await this.apis.words.getRandomWords(
            this.getWordCount(difficulty),
            difficulty
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

  clearCache(): void {
    this.cache.clear();
  }
}

export const contentManager = ContentManager.getInstance();
