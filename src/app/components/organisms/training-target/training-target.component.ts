import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core'
import { TargetComponent } from '../../atoms/target/target.component'
import { INTERVAL_TIME, PLAYGROUND, TARGET } from './training-target.config'
import { NbButtonModule } from '@nebular/theme'
import { NgIf } from '@angular/common'

export type TargetResultData = {
  averageTime: number
  averagePrecision: number
  points: number
}

@Component({
  selector: 'app-training-target',
  standalone: true,
  imports: [TargetComponent, NbButtonModule, NgIf],
  template: `
    <div
      class="game-container"
      [style.width]="PLAYGROUND.width + 'px'"
      [style.height]="PLAYGROUND.height + 'px'"
      (click)="registerClick($event)"
    >
      <div class="countdown p-2" *ngIf="countdownTime > 0">
        {{ countdownTime }}
      </div>
      <app-target
        *ngIf="trainingStarted && countdownTime === 0"
        [positionX]="positionX"
        [positionY]="positionY"
        [width]="TARGET.width"
        [height]="TARGET.height"
        [targetImage]="'target.png'"
      ></app-target>
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
      background-image: url('../../../../assets/images/target_shooting_background.png');
      background-size: cover;
      background-position: center;
    }
  `
})
export class TrainingTargetComponent implements OnDestroy, OnChanges {
  @Input() trainingStarted: boolean = false
  @Output() trainingEnded = new EventEmitter<TargetResultData>()

  protected readonly PLAYGROUND = PLAYGROUND
  protected readonly TARGET = TARGET
  protected positionX: number
  protected positionY: number
  protected startTime: number | undefined
  protected movementInterval: NodeJS.Timeout | undefined
  protected countdownTime: number
  private trainingData: { time: number; precision: number }[]
  private newTargetCount: number

  constructor() {
    const positions = this.getRandomPositions()
    this.positionX = positions.x
    this.positionY = positions.y
    this.trainingData = []
    this.newTargetCount = 0
    this.countdownTime = 5
  }

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
      this.startTraining()
    }
  }

  private onTrainingEnd(): void {
    this.trainingStarted = false
    this.trainingEnded.emit(this.calculateAverageAndPoints())
  }

  private getRandomPositions(): { x: number; y: number } {
    return {
      x: Math.random() * (PLAYGROUND.width - TARGET.width),
      y: Math.random() * (PLAYGROUND.height - TARGET.height)
    }
  }

  private calculateAverageAndPoints(): TargetResultData {
    const totalPoints = Math.round(
      this.trainingData.reduce(
        (acc, { time, precision }) =>
          acc + ((INTERVAL_TIME - time) / 1000) * precision,
        0
      )
    )
    const totalTime = Math.round(
      this.trainingData.reduce((acc, { time }) => acc + time, 0)
    )
    const totalPrecision = Math.round(
      this.trainingData.reduce((acc, { precision }) => acc + precision, 0)
    )

    return {
      averageTime: totalTime / this.trainingData.length,
      averagePrecision: totalPrecision / this.trainingData.length,
      points: totalPoints
    }
  }

  protected startTraining() {
    this.trainingStarted = true
    this.moveTarget()
    this.startTime = performance.now()
  }

  private moveTarget(): void {
    if (this.movementInterval) clearInterval(this.movementInterval)

    if (this.newTargetCount >= 20) {
      this.onTrainingEnd()
      return
    }

    const positions = this.getRandomPositions()
    this.positionX = positions.x
    this.positionY = positions.y
    this.startTime = performance.now()

    this.movementInterval = setInterval(() => {
      this.trainingData.push({ time: INTERVAL_TIME, precision: 0 })
      this.newTargetCount++

      if (this.newTargetCount >= 20) {
        clearInterval(this.movementInterval)
        this.onTrainingEnd()
        return
      }

      const positions = this.getRandomPositions()
      this.positionX = positions.x
      this.positionY = positions.y
      this.startTime = performance.now()
    }, INTERVAL_TIME)
  }

  protected registerClick(event: MouseEvent): void {
    if (!this.trainingStarted) return

    const rect = (event.target as Element).getBoundingClientRect()
    const centerX = rect.left + TARGET.width / 2
    const centerY = rect.top + TARGET.height / 2
    const clickX = event.clientX
    const clickY = event.clientY
    const distance = Math.sqrt(
      Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)
    )
    const precision = Math.max(0, 100 - (distance / (TARGET.width / 2)) * 100)
    const time = performance.now() - this.startTime!

    this.trainingData.push({ time, precision })
    this.newTargetCount++

    if (this.newTargetCount >= 20) {
      clearInterval(this.movementInterval)
      this.onTrainingEnd()
      return
    }

    this.moveTarget()
  }

  ngOnDestroy() {
    clearInterval(this.movementInterval)
  }
}
