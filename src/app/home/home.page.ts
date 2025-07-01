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
  isCorrectoAnswer: boolean;
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
      isCorrectoAnswer: false,
    },
    {
      text: 'Anular, tachar o borrar',
      isCorrectoAnswer: true,
    },
    {
      text: 'Que implica o denota duda',
      isCorrectoAnswer: false,
    },
  ];

  constructor() {}
}
