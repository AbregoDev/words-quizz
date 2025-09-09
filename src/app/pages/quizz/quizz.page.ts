import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonButton, IonFooter, IonProgressBar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';

import { QuestionComponent } from '../../components/question/question.component';
import { StartQuizzComponent } from "src/app/components/start-quizz/start-quizz.component";
import { QuizzResultComponent } from "src/app/components/quizz-result/quizz-result.component";
import { WordsRepositoryService } from 'src/app/services/words-repository.service';
import { WordQuestion } from 'src/app/interfaces/words-repository.interface';
import { AnswerEvent } from 'src/app/interfaces/events.interface';

interface EndQuizzEvent {
  score: number;
}

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.page.html',
  styleUrls: ['./quizz.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonFooter,
    IonProgressBar,
    QuestionComponent,
    StartQuizzComponent,
    QuizzResultComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizzComponent implements OnInit {

  readonly TOTAL_QUESTIONS = 7;
  questions: WordQuestion[] = [];

  @ViewChild('questionsSwiperContainer', { static: true }) swiperContainer!: ElementRef;
  swiperController!: Swiper;
  @ViewChild('mainSwiperContainer', { static: true }) mainSwiperContainer!: ElementRef;
  mainSwiperController!: Swiper;
  currentQuestionIndex: number = 0;
  isNextButtonBlocked: boolean = true;
  correctlyAnsweredQuestions: number = 0;
  hasQuizzEnded: boolean = false;

  @Output('endQuizz') endQuizzEvent = new EventEmitter<EndQuizzEvent>();

  private readonly wordsRepositoryService = inject(WordsRepositoryService);

  get progressValue() {
    return (this.currentQuestionIndex + 1) / (this.questions.length);
  }

  get isQuizzActive() {
    return this.mainSwiperController?.activeIndex === 1;
  }

  ngOnInit(): void {
    this.swiperController = this.swiperContainer.nativeElement.swiper;
    this.mainSwiperController = this.mainSwiperContainer.nativeElement.swiper;

    const words = this.wordsRepositoryService.getWordsQuestions(this.TOTAL_QUESTIONS);
    this.questions = words;
  }

  startQuizz() {
    this.mainSwiperController.slideNext();
  }

  moveToNextQuestion() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.mainSwiperController.slideNext();
      this.hasQuizzEnded = true;
      return;
    }

    this.swiperController.slideNext();
    this.currentQuestionIndex++;
    this.isNextButtonBlocked = true;
  }

  checkAnswer(answerEvent: AnswerEvent) {
    if (answerEvent.isRightAnswer) {
      this.correctlyAnsweredQuestions++;
    }

    this.isNextButtonBlocked = false;
  }

  resetQuizz() {
    this.mainSwiperController.slideTo(0);
    this.swiperController.slideTo(0);

    const words = this.wordsRepositoryService.getWordsQuestions(5);
    this.questions = words;
    this.currentQuestionIndex = 0;
    this.correctlyAnsweredQuestions = 0;
    this.isNextButtonBlocked = true;
    this.hasQuizzEnded = false;
  }
}
