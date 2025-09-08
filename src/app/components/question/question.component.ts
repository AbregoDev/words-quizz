import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonText, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  imports: [
    IonText,
    IonButton,
  ],
})
export class QuestionComponent {

  @Input() questionWord: string = '';
  @Input() options: string[] = [];
  hasUserAnswered: boolean = false;
  rightAnswerIndex: number = 0;

  @Output('onAnswer') readonly answerEvent = new EventEmitter<number>();

  emitAnswer(answerIndex: number) {
    this.answerEvent.emit(answerIndex);
  }
}
