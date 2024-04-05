import { Component, OnInit } from '@angular/core'
import { Award } from '../../../models/award/award.dto'
import { FirestoreDbService } from '../../../services/firestore-db.service'
import { NgForOf } from '@angular/common'
import { AwardTrophyComponent } from '../../molecules/award-trophy/award-trophy.component'
import { NbLayoutModule } from '@nebular/theme'
import { AuthService } from '../../../services/auth.service'
import { AwardService } from '../../../services/award.service'
import { ToastService } from '../../../services/toast.service'

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [NgForOf, AwardTrophyComponent, NbLayoutModule],
  template: `
    <nb-layout
      ><nb-layout-column>
        <div class="awards-container">
          <app-award-trophy
            *ngFor="let award of awards"
            [award]="award"
          ></app-award-trophy>
        </div> </nb-layout-column
    ></nb-layout>
  `,
  styles: `
    .awards-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 2rem;
    }
  `
})
export class AwardsComponent implements OnInit {
  protected awards: Award[] = []

  public constructor(
    private readonly firestoreDbService: FirestoreDbService,
    private readonly awardService: AwardService,
    private readonly auth: AuthService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadAwards().catch((error) => this.toastService.showError(error))
  }

  private async loadAwards(): Promise<void> {
    try {
      const user = await this.firestoreDbService.getCurrentUser(this.auth.uid)
      const awards = await this.awardService.getAwards()

      this.awards = awards.map((award) => {
        const userAward = user.userAwards?.find(
          (userAward) => userAward.awardId === award.id
        )
        return userAward
          ? {
              ...award,
              image: `assets/awards/${award.id}.png`,
              dateApplied: userAward.dateApplied
            }
          : {
              ...award,
              image: `assets/awards/placeholder.png`
            }
      })
    } catch (error) {
      this.toastService.showError(`${error}`)
    }
  }
}
