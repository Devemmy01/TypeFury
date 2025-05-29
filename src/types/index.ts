export interface UserStats {
  personalBests: {
    wpm15s: number;
    wpm30s: number;
    wpm60s: number;
    wpm120s: number;
    wpm300s: number;
  };
  overallStats: {
    totalTests: number;
    averageWpm: number;
    averageAccuracy: number;
    totalTime: number;
  };
  streaks: {
    current: number;
    longest: number;
    lastTestDate: string | null;
  };
  testHistory: TestResult[];
  achievements: Achievement[];
  preferences: {
    theme: "light" | "dark" | "high-contrast";
    soundEnabled: boolean;
  };
}

export interface TestResult {
  id: string;
  date: string;
  duration: number;
  wpm: number;
  accuracy: number;
  textCategory: string;
  textDifficulty: "easy" | "medium" | "hard";
  mistakes: number;
  charactersTyped: number;
  charactersCorrect: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: "speed" | "accuracy" | "streak" | "volume" | "explorer";
  unlockedAt: string | null;
  progress: number;
  target: number;
  icon: string;
}

export interface TextContent {
  id: string;
  category: "quotes" | "programming" | "literature" | "news";
  difficulty: "easy" | "medium" | "hard";
  content: string;
  author?: string;
  source?: string;
}

export interface DailyChallenge {
  id: string;
  date: string;
  text: TextContent;
  specialTheme?: string;
  bonusPoints?: number;
}

export type TestDuration = 15 | 30 | 60 | 120 | 300;
