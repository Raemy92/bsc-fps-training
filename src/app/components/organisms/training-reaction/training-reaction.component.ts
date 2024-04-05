import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import { PLAYGROUND, ROUNDS } from './training-reaction.config'
import { DecimalPipe, NgClass, NgIf } from '@angular/common'

export type ReactionResultData = {
  averageReactionTime: number
  points: number
}

@Component({
  selector: 'app-training-reaction',
  standalone: true,
  imports: [NgClass, DecimalPipe, NgIf],
  template: `
    <div
      class="game-container"
      [style.width]="PLAYGROUND.width + 'px'"
      [style.height]="PLAYGROUND.height + 'px'"
      (click)="onScreenClick()"
    >
      <img
        draggable="false"
        src="../../../../assets/images/reaction_background_waiting.png"
        class="background-image waiting"
        [ngClass]="{ active: state === 'waiting' }"
      />
      <img
        draggable="false"
        src="../../../../assets/images/reaction_background_ready.png"
        class="background-image ready"
        [ngClass]="{ active: state === 'ready' }"
      />
      <div class="countdown p-2" *ngIf="countdownTime > 0">
        {{ countdownTime }}
      </div>
      <div class="score-board p-1">
        <div class="round mb-1">Runde: {{ round }} / 10</div>
        <div class="time mb-1">
          Reaktionszeit: {{ reactionTime ? reactionTime + ' ms' : '-' }}
        </div>
        <div class="average">
          Durchschnitt: {{ averageReactionTime | number: '1.0-2' }} ms
        </div>
      </div>
    </div>
  `,
  styles: `
    .game-container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      outline: 3px solid #a16eff;
      cursor: crosshair;
    }

    .background-image {
      width: 100%;
      height: 100%;
      display: none;
      user-drag: none;
      -webkit-user-drag: none;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;

      &.active {
        display: block;
      }
    }

    .score-board {
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 20px;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
    }
  `
})
export class TrainingReactionComponent implements OnChanges {
  @Input() trainingStarted: boolean = false
  @Output() trainingEnded = new EventEmitter<ReactionResultData>()

  protected readonly PLAYGROUND = PLAYGROUND
  protected state: 'waiting' | 'ready' = 'waiting'
  protected averageReactionTime: number | null = null
  protected round: number = 1
  protected reactionTime: number | null = null
  protected countdownTime: number = 5
  private reactionTimes: number[] = []
  private timeout: NodeJS.Timeout | undefined
  private startTime: number = 0

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['trainingStarted'] &&
      changes['trainingStarted'].currentValue === true
    ) {
      this.startCountdown()
    }
  }

  private startCountdown() {
    if (this.countdownTime > 0) {
      setTimeout(() => {
        this.countdownTime--
        this.startCountdown()
      }, 1000)
    } else {
      this.startRound()
    }
  }

  private onTrainingEnd() {
    this.trainingStarted = false
    this.trainingEnded.emit({
      averageReactionTime: this.averageReactionTime || 10000,
      points: 10000 - (this.averageReactionTime || 10000)
    })
  }

  private startRound() {
    this.trainingStarted = true
    this.state = 'waiting'
    const randomDelay = Math.floor(Math.random() * 10000) + 2000
    this.timeout = setTimeout(() => {
      this.state = 'ready'
      this.startTime = performance.now()
    }, randomDelay)
  }

  private endRound(reactionTime: number) {
    this.reactionTimes.push(reactionTime)
    this.averageReactionTime =
      this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length
    this.round++

    if (this.round <= ROUNDS) {
      this.startRound()
    } else {
      clearTimeout(this.timeout)
      this.onTrainingEnd()
    }
  }

  onScreenClick() {
    if (this.state === 'waiting') {
      // Early click, reset round
      this.reactionTime = null
      clearTimeout(this.timeout)
      this.startRound()
    } else if (this.state === 'ready') {
      const reactionTime = Math.round(performance.now() - this.startTime)
      this.reactionTime = reactionTime
      this.endRound(reactionTime)
      this.state = 'waiting'
    }
  }
}
