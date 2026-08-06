// Dashboard Summary
export interface Summary {
  questionsRevised: number;
  totalRevisions: number;
  topicsCovered: number;
  notesRevised: number;
  theoriesRevised: number | null;
  currentStreak: number;
  todayRevisionCount: number;
  mostRevisedTopic: number;
}

// Weak Topics
export interface WeakTopicDto {
  topicId: number;
  lastVisited: string; // LocalDateTime -> ISO string
}

// Most Revised Questions
export interface MostRevisedQuestionDto {
  questionId: number;
  revisionCount: number;
}

// Least Revised Questions
export interface LeastRevisedQuestionDto {
  questionId: number;
  revisionCount: number;
}

export interface WeakTopicChartData {
  name: string;
  lastVisited: string;
}

export interface RevisedQuestionChartData {
  name: string;
  revisionCount: number;
}