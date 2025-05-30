import { TextContent } from "../types";

// Base API class for common functionality
class BaseAPI {
  protected async fetchWithTimeout(
    url: string,
    timeout = 5000
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}

export class QuoteAPI extends BaseAPI {
  private baseURL = "https://api.quotable.io";

  async getRandomQuote(
    difficulty: TextContent["difficulty"] = "medium"
  ): Promise<TextContent> {
    const lengths = {
      easy: { min: 30, max: 80 },
      medium: { min: 60, max: 150 },
      hard: { min: 120, max: 300 },
    };

    const { min, max } = lengths[difficulty];
    const response = await this.fetchWithTimeout(
      `${this.baseURL}/random?minLength=${min}&maxLength=${max}`
    );
    const data = await response.json();

    return {
      id: crypto.randomUUID(),
      category: "quotes",
      difficulty,
      content: data.content,
      author: data.author,
      source: "Quotable API",
    };
  }

  async getQuotesByTag(tag: string = "motivational"): Promise<TextContent> {
    const response = await this.fetchWithTimeout(
      `${this.baseURL}/random?tags=${tag}&minLength=50&maxLength=200`
    );
    const data = await response.json();

    return {
      id: crypto.randomUUID(),
      category: "quotes",
      difficulty: "medium",
      content: data.content,
      author: data.author,
      source: `Quotable API - ${tag}`,
    };
  }
}

export class LoremAPI extends BaseAPI {
  private baseURL = "https://loripsum.net/api";

  async getText(
    sentences: number = 5,
    difficulty: TextContent["difficulty"] = "medium",
    options: string = "medium/plaintext"
  ): Promise<TextContent> {
    const response = await this.fetchWithTimeout(
      `${this.baseURL}/${sentences}/${options}`
    );
    const text = await response.text();

    return {
      id: crypto.randomUUID(),
      category: "practice",
      difficulty,
      content: text.trim(),
      source: "Lorem Ipsum",
    };
  }
}

export class WikiAPI extends BaseAPI {
  private topics = [
    "programming",
    "technology",
    "science",
    "history",
    "literature",
  ];

  async getContent(topic?: string): Promise<TextContent> {
    const selectedTopic =
      topic || this.topics[Math.floor(Math.random() * this.topics.length)];
    const response = await this.fetchWithTimeout(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${selectedTopic}`
    );
    const data = await response.json();

    return {
      id: crypto.randomUUID(),
      category: "educational",
      difficulty: "medium",
      content: data.extract,
      source: `Wikipedia - ${data.title}`,
      author: data.author,
    };
  }
}

export class WordsAPI extends BaseAPI {
  async getRandomWords(
    count: number = 50,
    difficulty: TextContent["difficulty"] = "medium"
  ): Promise<TextContent> {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      const response = await this.fetchWithTimeout(
        "https://random-words-api.vercel.app/word"
      );
      const data = await response.json();
      words.push(data[0].word);
    }
    return {
      id: crypto.randomUUID(),
      category: "words",
      difficulty,
      content: words.join(" "),
      source: "Random Words API",
    };
  }
}

export class CodeAPI extends BaseAPI {
  async getCodeSnippet(
    difficulty: TextContent["difficulty"] = "medium"
  ): Promise<TextContent> {
    const response = await this.fetchWithTimeout(
      "https://api.github.com/gists/public?per_page=10"
    );
    const gists = await response.json();
    const randomGist = gists[Math.floor(Math.random() * gists.length)];

    const gistResponse = await this.fetchWithTimeout(randomGist.url);
    const gistData = await gistResponse.json();
    const fileName = Object.keys(gistData.files)[0];
    const content = gistData.files[fileName].content;

    const lengths = { easy: 200, medium: 400, hard: 800 };
    const maxLength = lengths[difficulty] || 400;

    return {
      id: crypto.randomUUID(),
      category: "programming",
      difficulty,
      content: content.substring(0, maxLength),
      source: "GitHub Gists",
      author: gistData.owner?.login || "Unknown",
    };
  }
}
