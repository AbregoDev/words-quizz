import { Component } from '@angular/core';
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
  status: Status;
}

type ButtonColor = 'primary' | 'danger' | 'success';
type Status = 'initial' | 'rightAnswer' | 'wrongAnswer';

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
      status: 'initial',
    },
    {
      text: 'Anular, tachar o borrar',
      status: 'initial',
    },
    {
      text: 'Que implica o denota duda',
      status: 'initial',
    },
    {
      text: 'No c bro disculpa',
      status: 'initial',
    },
  ];
  hasUserAnswered: boolean = false;
  rightAnswerIndex: number = 1;

  answerQuestion(selectedAnswerIndex: number) {
    if (this.hasUserAnswered) return;

    this.options.forEach((option, currentIndex) => {
      if (currentIndex === this.rightAnswerIndex) {
        option.status = 'rightAnswer';
      } else if (currentIndex === selectedAnswerIndex) {
        option.status = 'wrongAnswer';
      }
    })
    
    this.hasUserAnswered = true;
  }

  getButtonColor(status: Status): ButtonColor {
    switch (status) {
      case 'initial': return 'primary';
      case 'rightAnswer': return 'success';
      case 'wrongAnswer': return 'danger';
    }
  }

  reset() {
    this.options.forEach(option => option.status = 'initial');
    this.hasUserAnswered = false;
  }
}
