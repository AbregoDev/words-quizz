import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-start-quizz',
  templateUrl: './start-quizz.component.html',
  styleUrls: ['./start-quizz.component.scss'],
  imports: [IonButton],
})
export class StartQuizzComponent {

  @Input() totalQuestions!: number;
  @Output('onStartQuizz') startQuizzEventEmitter = new EventEmitter();

  emitStartQuizzEvent() {
    this.startQuizzEventEmitter.emit();
  }
}
