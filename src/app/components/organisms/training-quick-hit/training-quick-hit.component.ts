import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core'
import { DecimalPipe, NgIf } from '@angular/common'
import { TargetComponent } from '../../atoms/target/target.component'
import { TARGET, PLAYGROUND } from './training-quick-hit.config'

export type QuickHitResultData = {
  points: number
  highestStreak: number
  perfectStreak: boolean
  ctHits: number
}

@Component({
  selector: 'app-training-quick-hit',
  standalone: true,
  imports: [DecimalPipe, TargetComponent, NgIf],
  template: `
    <div
      class="game-container"
      [style.width]="PLAYGROUND.width + 'px'"
      [style.height]="PLAYGROUND.height + 'px'"
      (click)="countdownTime === 0 && onContainerClicked()"
    >
      <div class="countdown p-2" *ngIf="countdownTime > 0">
        {{ countdownTime }}
      </div>
      <app-target
        *ngIf="showTarget && countdownTime === 0"
        [targetImage]="currentTarget"
        [width]="TARGET.width"
        [height]="TARGET.height"
        [borderRadius]="0"
        [positionX]="PLAYGROUND.width / 2 - TARGET.width / 2"
        [positionY]="PLAYGROUND.height / 2 - TARGET.height / 2"
      ></app-target>
      <div class="score-board p-1">
        <div class="score mb-1">Punkte: {{ points | number: '1.0-2' }}</div>
        <div class="timer mb-1">verbleibende Zeit: {{ remainingTime }}</div>
        <div class="streak">Streak: {{ streak }}</div>
      </div>
    </div>
  `,
  styles: `
    .game-container {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      outline: 3px solid #a16eff;
      cursor: crosshair;
      background-image: url('../../../../assets/images/reaction_background_waiting.png');
      background-size: cover;
      background-position: center;
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
export class TrainingQuickHitComponent implements OnChanges, OnDestroy {
  @Input() trainingStarted: boolean = false
  @Output() trainingEnded = new EventEmitter<QuickHitResultData>()

  protected readonly PLAYGROUND = PLAYGROUND
  protected readonly TARGET = TARGET
  protected points: number = 0
  protected currentTarget: string = ''
  protected showTarget: boolean = false
  protected remainingTime: number = 60
  protected streak: number = 0
  protected highestStreak: number = 0
  protected perfectStreak: boolean = true
  protected ctHits: number = 0
  protected countdownTime: number = 5
  private countdownTimer: NodeJS.Timeout | undefined
  private targetTimeout: NodeJS.Timeout | undefined
  private gameTimer: NodeJS.Timeout | undefined

  constructor() {}

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
      document.addEventListener('keydown', this.handleKeydown)
      this.startTraining()
    }
  }

  private startTraining() {
    this.trainingStarted = true
    this.showTarget = true
    this.spawnTarget()
    this.remainingTime = 60
    this.streak = 0
    this.countdownTimer = setInterval(() => {
      this.remainingTime--
      if (this.remainingTime <= 0) {
        this.onTrainingEnd()
      }
    }, 1000)
    this.gameTimer = setInterval(() => {
      this.onTrainingEnd()
    }, 60000)
  }

  private onTrainingEnd() {
    this.trainingStarted = false
    clearTimeout(this.targetTimeout)
    clearTimeout(this.gameTimer)
    clearInterval(this.countdownTimer)
    this.showTarget = false
    this.trainingEnded.emit({
      points: this.points,
      highestStreak: this.highestStreak,
      perfectStreak: this.perfectStreak,
      ctHits: this.ctHits
    })
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'f' && this.currentTarget === 'kitten.png') {
      this.points += 5
      this.streak++
      if (this.streak > this.highestStreak) this.highestStreak = this.streak
      this.spawnTarget()
    } else {
      this.points -= 5
      this.streak = 0
      this.perfectStreak = false
      this.spawnTarget()
    }
  }

  private spawnTarget() {
    if (!this.trainingStarted) return
    this.showTarget = false
    setTimeout(() => {
      this.currentTarget = this.getWeightedRandomTarget()
      this.showTarget = true
      this.resetTargetTimer()
    }, 300)
  }

  private getWeightedRandomTarget(): string {
    const totalWeight: number = Object.values(TARGET.weights).reduce(
      (acc: number, weight: number) => acc + weight,
      0
    )
    let random = Math.random() * totalWeight

    for (const [image, weight] of Object.entries(TARGET.weights)) {
      if (random < weight) {
        return image
      }
      random -= weight
    }

    return 't.png'
  }

  private resetTargetTimer() {
    clearTimeout(this.targetTimeout)
    this.targetTimeout = setTimeout(() => {
      if (this.currentTarget === 'ct.png') {
        this.points += 3
        this.streak++
        if (this.streak > this.highestStreak) this.highestStreak = this.streak
      } else {
        this.points--
        this.streak = 0
        this.perfectStreak = false
      }
      this.spawnTarget()
    }, 1500)
  }

  public onContainerClicked() {
    if (this.currentTarget === 't.png') {
      this.points++
      this.streak++
      if (this.streak > this.highestStreak) this.highestStreak = this.streak
    } else {
      this.points -= 5
      this.streak = 0
      this.perfectStreak = false

      if (this.currentTarget === 'ct.png') {
        this.ctHits++
      }
    }
    this.spawnTarget()
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeydown)
    clearTimeout(this.targetTimeout)
  }
}
