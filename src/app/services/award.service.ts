import { Injectable } from '@angular/core'
import { FirestoreDbService } from './firestore-db.service'
import { Award } from '../models/award/award.dto'
import { AWARDS_COLLECTION_NAME } from '../components/pages/awards/awards.config'
import { formatDate } from '../utils/date.util'
import { NbDialogService } from '@nebular/theme'
import { NewAwardDialogComponent } from '../components/organisms/new-award-dialog/new-award-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class AwardService {
  private awards: Award[] = []

  constructor(
    private readonly firestoreDbService: FirestoreDbService,
    private readonly dialogService: NbDialogService
  ) {}

  public async getAwards(): Promise<Award[]> {
    if (this.awards.length) return this.awards

    const data =
      await this.firestoreDbService.getMultipleDocumentsFromCollection(
        AWARDS_COLLECTION_NAME,
        {
          orderBy: [['id', 'asc']]
        }
      )

    this.awards = data.docs.map((doc) => doc.data() as Award)
    return this.awards
  }

  public async getAwardById(awardId: string): Promise<Award> {
    if (this.awards.length) {
      return this.awards.find((award) => award.id === awardId) as Award
    }

    const data =
      await this.firestoreDbService.getMultipleDocumentsFromCollection(
        AWARDS_COLLECTION_NAME,
        {
          customQuery: [{ property: 'id', operator: '==', value: awardId }]
        }
      )

    return data.docs[0].data() as Award
  }

  public async checkAndAddUserAward(userId: string, awardId: string) {
    await this.firestoreDbService.getCurrentUser(userId).then((user) => {
      const hasAward = user.userAwards.some(
        (award) => award.awardId === awardId
      )

      if (!hasAward) {
        this.firestoreDbService
          .updateDocument('users', userId, {
            userAwards: [
              ...user.userAwards,
              {
                awardId,
                dateApplied: formatDate(new Date(), false)
              }
            ]
          })
          .then(() => {
            this.getAwardById(awardId).then((award) => {
              this.dialogService.open(NewAwardDialogComponent, {
                closeOnEsc: false,
                closeOnBackdropClick: false,
                context: {
                  award
                },
                dialogClass: 'custom-overlay-pane'
              })
            })
          })
      }
    })
  }
}
