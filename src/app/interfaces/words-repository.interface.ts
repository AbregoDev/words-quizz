export interface WordMeaning {
    word: string;
    answer: string;
}

export type WordRepository = WordMeaning[];

export interface WordQuestion {
  word: string;
  options: string[];
  rightAnswerIndex: number;
}