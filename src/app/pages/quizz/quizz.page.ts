import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonButton, IonFooter, IonProgressBar } from '@ionic/angular/standalone';
import Swiper from 'swiper';
import { QuestionComponent } from '../../components/question/question.component';
import { StartQuizzComponent } from "src/app/components/start-quizz/start-quizz.component";
import { CommonModule } from '@angular/common';
import { QuizzResultComponent } from "src/app/components/quizz-result/quizz-result.component";

interface WordQuestion {
  word: string;
  options: string[];
  rightAnswerIndex: number;
}

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

  questions: WordQuestion[] = [
    {
      word: 'Variopinto',
      options: [
        'Opción 1',
        'Opción 2',
        'Opción 3'
      ],
      rightAnswerIndex: 1
    },
    {
      word: 'Techunbre',
      options: [
        'Opción X',
        'Opción Y',
      ],
      rightAnswerIndex: 0
    },
    {
      word: 'Afable',
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D',
      ],
      rightAnswerIndex: 2
    }
  ];

  @ViewChild('questionsSwiperContainer', { static: true }) swiperContainer!: ElementRef;
  swiperController!: Swiper;
  @ViewChild('mainSwiperContainer', { static: true }) mainSwiperContainer!: ElementRef;
  mainSwiperController!: Swiper;
  currentQuestionIndex: number = 0;
  isNextButtonBlocked: boolean = true;

  @Output('endQuizz') endQuizzEvent = new EventEmitter<EndQuizzEvent>();

  get progressValue() {
    return (this.currentQuestionIndex + 1) / (this.questions.length);
  }

  get isQuizzActive() {
    return this.mainSwiperController?.activeIndex === 1;
  }

  ngOnInit(): void {
    this.swiperController = this.swiperContainer.nativeElement.swiper;
    this.mainSwiperController = this.mainSwiperContainer.nativeElement.swiper;
  }

  startQuizz() {
    this.mainSwiperController.slideNext();
  }

  moveToNextQuestion() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.mainSwiperController.slideNext();
      return;
    }

    this.swiperController.slideNext();
    this.currentQuestionIndex++;
    this.isNextButtonBlocked = true;
  }

  checkAnswer(answerIndex: number) {
    this.isNextButtonBlocked = false;
  }
}
