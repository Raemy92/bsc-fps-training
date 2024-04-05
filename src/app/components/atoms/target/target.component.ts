import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Storage } from '@angular/fire/storage'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-target',
  standalone: true,
  imports: [AsyncPipe],
  template: ` <div
    class="target"
    [style.left]="positionX + 'px'"
    [style.top]="positionY + 'px'"
    [style.width]="width + 'px'"
    [style.height]="height + 'px'"
    [style.background-image]="'url(' + backgroundUrl + ')'"
    [style.border-radius]="borderRadius + '%'"
  ></div>`,
  styles: `
    .target {
      position: absolute;
      background-size: cover;
      user-select: none;
    }
  `
})
export class TargetComponent implements OnChanges {
  @Input() positionX: number = 0
  @Input() positionY: number = 0
  @Input() width: number = 0
  @Input() height: number = 0
  @Input() targetImage: string = 'target.png'
  @Input() borderRadius: number = 50

  protected backgroundUrl: string = '../assets/images/target.png'

  constructor(private storage: Storage) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['targetImage']) {
      this.updateBackgroundImage()
    }
  }

  private async updateBackgroundImage() {
    this.backgroundUrl = `assets/images/${this.targetImage}`
  }
}
