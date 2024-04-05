import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core'
import {
  PLAYGROUND,
  TARGET,
  WAYPOINTS_COUNT
} from './training-moving-target.config'
import { TargetComponent } from '../../atoms/target/target.component'
import { DecimalPipe, NgIf } from '@angular/common'

export type MovingTargetResultData = {
  points: number
  perfectAim: boolean
}

@Component({
  selector: 'app-training-moving-target',
  standalone: true,
  imports: [TargetComponent, DecimalPipe, NgIf],
  template: `
    <div
      class="game-container"
      [style.width]="PLAYGROUND.width + 'px'"
      [style.height]="PLAYGROUND.height + 'px'"
    >
      <div class="countdown p-2" *ngIf="countdownTime > 0">
        {{ countdownTime }}
      </div>
      <app-target
        *ngIf="trainingStarted"
        [positionX]="positionX"
        [positionY]="positionY"
        [width]="size"
        [height]="size"
      ></app-target>
      <div class="score-board p-1">
        <div class="score mb-1">Punkte: {{ score | number: '1.0-2' }}</div>
      </div>
    </div>
  `,
  styles: `
    .game-container {
      position: relative;
      outline: 3px solid #a16eff;
      cursor: crosshair;
      background-image: url('../../../../assets/images/target_shooting_background.png');
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
export class TrainingMovingTargetComponent implements OnChanges, OnDestroy {
  @Input() trainingStarted: boolean = false
  @Output() trainingEnded = new EventEmitter<MovingTargetResultData>()

  protected readonly PLAYGROUND = PLAYGROUND
  protected positionX: number
  protected positionY: number
  protected size: number
  protected score: number
  protected perfectAim: boolean
  protected countdownTime: number
  private speed: number
  private mouseX: number
  private mouseY: number
  private gameContainerOffset: { x: number; y: number }
  private readonly waypoints: { x: number; y: number }[]
  private currentWaypointIndex: number
  private gameOver: boolean
  private readonly deltaTime: number

  constructor(private elementRef: ElementRef) {
    this.positionX = PLAYGROUND.width / 2 - TARGET.widthMax / 2
    this.positionY = PLAYGROUND.height / 2 - TARGET.heightMax / 2
    this.size = TARGET.widthMax
    this.speed = TARGET.speedMin
    this.score = 0
    this.perfectAim = true
    this.countdownTime = 5
    this.mouseX = 0
    this.mouseY = 0
    this.gameContainerOffset = { x: 0, y: 0 }
    this.waypoints = []
    this.currentWaypointIndex = 0
    this.gameOver = false
    this.deltaTime = 1000 / 60
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['trainingStarted'] &&
      changes['trainingStarted'].currentValue === true
    ) {
      window.addEventListener('mousemove', this.onMouseMove.bind(this))
      this.calculateContainerOffset()
      this.generateWaypoints()
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
      this.startMovingTarget()
    }
  }

  private onTrainingEnd() {
    this.gameOver = true
    this.trainingStarted = false
    this.score = parseFloat(this.score.toFixed(2))
    this.trainingEnded.emit({ points: this.score, perfectAim: this.perfectAim })
  }

  private calculateContainerOffset() {
    const rect = this.elementRef.nativeElement
      .querySelector('.game-container')
      .getBoundingClientRect()
    this.gameContainerOffset.x = rect.left
    this.gameContainerOffset.y = rect.top
  }

  private onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX - this.gameContainerOffset.x
    this.mouseY = event.clientY - this.gameContainerOffset.y
  }

  private generateWaypoints() {
    for (let i = 0; i < WAYPOINTS_COUNT; i++) {
      this.waypoints.push({
        x: Math.random() * (PLAYGROUND.width - this.size),
        y: Math.random() * (PLAYGROUND.height - this.size)
      })
    }
  }

  private moveToNextWaypoint() {
    if (this.currentWaypointIndex < this.waypoints.length) {
      const waypoint = this.waypoints[this.currentWaypointIndex]
      this.positionX = waypoint.x
      this.positionY = waypoint.y
      this.currentWaypointIndex++
    } else {
      this.currentWaypointIndex = 0
    }
  }

  private startMovingTarget() {
    this.trainingStarted = true
    const animate = () => {
      this.updateTargetPosition()
      this.updateTargetSizeAndSpeed()
      this.calculateScore()
      if (!this.gameOver) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  private updateTargetPosition() {
    if (this.currentWaypointIndex < this.waypoints.length) {
      const waypoint = this.waypoints[this.currentWaypointIndex]
      const directionX = waypoint.x - this.positionX
      const directionY = waypoint.y - this.positionY
      const distance = Math.sqrt(
        directionX * directionX + directionY * directionY
      )

      if (distance < 10) {
        this.moveToNextWaypoint()
      } else {
        const moveDistance = (this.speed * this.deltaTime) / 2500
        this.positionX += (directionX / distance) * moveDistance
        this.positionY += (directionY / distance) * moveDistance
      }
    } else {
      this.onTrainingEnd()
    }
  }

  private updateTargetSizeAndSpeed() {
    this.size = Math.max(this.size * 0.99985, TARGET.widthMin)
    this.speed = Math.min(this.speed + 0.075, TARGET.speedMax)
  }

  private calculateScore() {
    const centerX = this.positionX + this.size / 2
    const centerY = this.positionY + this.size / 2
    const distance = Math.sqrt(
      Math.pow(this.mouseX - centerX, 2) + Math.pow(this.mouseY - centerY, 2)
    )

    if (distance < this.size / 2) {
      this.score +=
        ((this.size / 2 - distance) / (this.size / 2)) * (this.deltaTime / 18)
    } else {
      this.perfectAim = false
    }
  }

  ngOnDestroy() {
    window.removeEventListener('mousemove', this.onMouseMove.bind(this))
  }
}
