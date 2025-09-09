import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-quizz-result',
  templateUrl: './quizz-result.component.html',
  styleUrls: ['./quizz-result.component.scss'],
  imports: [CommonModule, IonButton]
})
export class QuizzResultComponent {

  private readonly LOW_SCORE_THRESHOLD = 0.5;
  private readonly HIGH_SCORE_THRESHOLD = 0.8;

  @Input() correctlyAnsweredQuestions!: number;
  @Input() totalQuestions!: number;
  @Output() private readonly exitEvent = new EventEmitter();

  scoreClasses: string[] = ['score'];
  @Input() set hasQuizzEnded(value: boolean) {
    if (value) this.showScoreClasses();
    else this.restoreScoreClasses();
  }

  private showScoreClasses() {
    const scoreRatio = this.correctlyAnsweredQuestions / this.totalQuestions;
    let scoreClass = scoreRatio < this.LOW_SCORE_THRESHOLD
      ? 'low-score'
      : scoreRatio < this.HIGH_SCORE_THRESHOLD
        ? 'medium-score'
        : 'high-score';

    this.scoreClasses.push('visible-score', scoreClass);
  }

  private restoreScoreClasses() {
    setTimeout(() => {
      this.scoreClasses = ['score'];
    }, 500);
  }

  emitExitEvent() {
    this.exitEvent.emit();
  }
}
