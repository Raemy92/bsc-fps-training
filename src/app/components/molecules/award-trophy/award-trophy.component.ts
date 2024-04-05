import { Component, Input } from '@angular/core'
import { NbCardModule, NbTooltipModule } from '@nebular/theme'
import { Award } from '../../../models/award/award.dto'
import { LazyImageComponent } from '../../atoms/lazy-image/lazy-image.component'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-award-trophy',
  standalone: true,
  imports: [NbCardModule, NbTooltipModule, LazyImageComponent, NgIf],
  template: `
    <div
      class="award-container"
      nbTooltip="{{ award.description }}"
      nbTooltipStatus="primary"
      nbTooltipPlacement="bottom"
      nbTooltipIcon="info"
    >
      <app-lazy-image [src]="award.image!"></app-lazy-image>
      <div class="award-banner py-1 px-2">
        @if (award.dateApplied) {
          <div class="font-bold">{{ award.name }}</div>
          <div class="font-italic">{{ award.dateApplied }}</div>
        } @else {
          <div>Noch nicht freigeschaltet</div>
        }
      </div>
    </div>
  `,
  styles: `
    .award-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition:
        transform 0.3s,
        box-shadow 0.3s;

      &:hover {
        transform: translateY(-10px);

        .award-banner {
          transform: scale(1.1);
        }
      }

      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
      }
    }

    .award-banner {
      width: 80%;
      word-break: break-word;
      background-color: #323259;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      transition:
        background-color 0.3s,
        transform 0.3s;
    }
  `
})
export class AwardTrophyComponent {
  @Input({ required: true }) award!: Award
}
