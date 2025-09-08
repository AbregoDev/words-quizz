import { Injectable } from '@angular/core';
import wordsDB from '../utils/words-db.json';
import { WordMeaning, WordQuestion, WordRepository } from '../interfaces/words-repository.interface';

@Injectable({
  providedIn: 'root'
})
export class WordsRepositoryService {

  private readonly db = wordsDB as WordRepository;

  getWordsQuestions(wordsQuantity: number, questionOptions: number = 3): WordQuestion[] {
    const wordsWithMeaning = this.getRandomSampleOfWords(wordsQuantity);
    return wordsWithMeaning.map(({ word, answer }) => {
      const options = this.getRandomOptions(word, questionOptions - 1);
      options.push(answer);
      this.shuffleArray(options);
      const rightAnswerIndex = options.findIndex(option => option === answer);

      const wordQuestion: WordQuestion = {
        word,
        options,
        rightAnswerIndex,
      }

      return wordQuestion;
    });
  }

  private getRandomOptions(wordToExcluse: string, optionsLenght: number): string[] {
    const newRepository = this.getRepositoryWithoutSpecifiedWord(wordToExcluse);
    if (newRepository.length <= optionsLenght)
      return newRepository.map(word => word.answer);

    const options: string[] = [];
    while (options.length < optionsLenght) {
      const randomlyGeneratedIndex = Math.floor(Math.random() * newRepository.length);
      const randomOption = newRepository[randomlyGeneratedIndex].answer;

      if (!options.includes(randomOption))
        options.push(randomOption);
    }

    return options;
  }

  private getRepositoryWithoutSpecifiedWord(wordToExclude: string): WordRepository {
    const wordIndex = this.db.findIndex(el => el.word === wordToExclude);

    if (wordIndex === -1) return this.db;

    const newRepository = [...this.db];
    newRepository.splice(wordIndex, 1);
    return newRepository;
  }

  private getRandomSampleOfWords(limit: number): WordMeaning[] {
    const repositoryCopy = [...this.db];
    const repositorySample: WordMeaning[] = [];
    if (repositoryCopy.length <= limit) return repositoryCopy;

    while (repositorySample.length < limit) {
      const randomlyGeneratedIndex = Math.floor(Math.random() * repositoryCopy.length);
      const extractedWord = repositoryCopy.splice(randomlyGeneratedIndex, 1)[0];
      repositorySample.push(extractedWord);
    }

    return repositorySample;
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
