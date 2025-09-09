import { Component, EventEmitter, Output } from '@angular/core';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-quizz-result',
  templateUrl: './quizz-result.component.html',
  styleUrls: ['./quizz-result.component.scss'],
  imports: [IonButton]
})
export class QuizzResultComponent {

  @Output()
  private readonly exitEvent = new EventEmitter();

  emitExitEvent() {
    this.exitEvent.emit();
  }
}
