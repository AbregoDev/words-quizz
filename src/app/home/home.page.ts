import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonButton,
  IonFooter,
  IonProgressBar,
} from '@ionic/angular/standalone';

interface Option {
  text: string;
  color?: 'primary' | 'danger' | 'success';
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
    IonButton,
    IonFooter,
    IonProgressBar,
  ],
})
export class HomePage {

  options: Option[] = [
    {
      text: 'Divulgar algo oculto que generalmente se considera negativo',
    },
    {
      text: 'Anular, tachar o borrar',
    },
    {
      text: 'Que implica o denota duda',
    },
    {
      text: 'No c bro disculpa',
    },
  ];
  hasUserAnswered: boolean = false;
  rightAnswerIndex: number = 1;

  answerQuestion(selectedAnswerIndex: number) {
    if (this.hasUserAnswered) return;

    this.options.forEach((option, currentIndex) => {
      if (currentIndex === this.rightAnswerIndex) {
        option.color = 'success';
      } else if (currentIndex === selectedAnswerIndex) {
        option.color = 'danger';
      }
    })
    
    this.hasUserAnswered = true;
  }

  reset() {
    this.options.forEach(option => option.color = 'primary');
    this.hasUserAnswered = false;
  }
}
