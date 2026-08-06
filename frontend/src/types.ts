export type ItemId = number;

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface User {
  email: string;
  isAuthenticated: boolean;
}

export interface AuthSession {
  email: string;
  token: string;
  refreshToken: string;
}

export interface Topic {
  id: ItemId;
  name: string;
  createdAt: string;
}

export interface Question {
  id: ItemId;
  title: string;
  link: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  visitedCount: number;
  lastVisitedAt?: string | null;
  topicId: ItemId;
}

export interface Theory {
  id: ItemId;
  title: string;
  content: string;
  createdAt: string;
}
