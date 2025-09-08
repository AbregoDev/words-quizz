import { Component, OnInit } from '@angular/core';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-quizz-result',
  templateUrl: './quizz-result.component.html',
  styleUrls: ['./quizz-result.component.scss'],
  imports: [IonButton]
})
export class QuizzResultComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
