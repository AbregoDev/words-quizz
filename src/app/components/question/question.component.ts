import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonText, IonButton } from '@ionic/angular/standalone';
import { AnswerEvent } from 'src/app/interfaces/events.interface';
import { OptionStyle } from 'src/app/interfaces/option-style.interface';

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
  @Input() rightAnswerIndex!: number;

  optionsStyle!: OptionStyle[];
  private _options!: string[];
  get options() { return this._options; }
  @Input() set options(value: string[]) {
    this._options = value;
    this.optionsStyle = this.populateDefaultStyles(value);
    this.hasUserAnswered = false;
  }

  @Output('onAnswer') readonly answerEvent = new EventEmitter<AnswerEvent>();

  hasUserAnswered: boolean = false;

  evaluateAnswer(answerIndex: number) {
    if (this.hasUserAnswered) return;

    this.colorizeOptionsButtons(answerIndex, this.rightAnswerIndex);
    this.answerEvent.emit({ isRightAnswer: answerIndex === this.rightAnswerIndex });
    this.hasUserAnswered = true;
  }

  private colorizeOptionsButtons(userAnswerIndex: number, rightAnswerIndex: number) {
    if (userAnswerIndex === rightAnswerIndex) {
      this.optionsStyle[userAnswerIndex].color = 'success';
    } else {
      this.optionsStyle[userAnswerIndex].color = 'danger';
      this.optionsStyle[rightAnswerIndex].color = 'success';
    }
  }

  private populateDefaultStyles(options: string[]): OptionStyle[] {
    return options.map(() => ({
      fill: 'solid',
      color: 'primary',
    }));
  }
}
