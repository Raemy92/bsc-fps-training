import { Injectable } from '@angular/core'
import {
  AWARD_IDS,
  TRAINING_COLLECTION_IDS
} from '../resources/constants.resources'
import { UserTraining } from '../models/user/user.dto'
import { formatDate } from '../utils/date.util'
import { FirestoreDbService } from './firestore-db.service'
import { AuthService } from './auth.service'
import { AwardService } from './award.service'
import { TargetResultData } from '../components/organisms/training-target/training-target.component'
import { MovingTargetResultData } from '../components/organisms/training-moving-target/training-moving-target.component'
import { QuickHitResultData } from '../components/organisms/training-quick-hit/training-quick-hit.component'
import { ReactionResultData } from '../components/organisms/training-reaction/training-reaction.component'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(
    private readonly firestoreDbService: FirestoreDbService,
    private readonly authService: AuthService,
    private readonly awardsService: AwardService
  ) {}

  public saveTrainingResults(
    collectionName: string,
    results:
      | TargetResultData
      | MovingTargetResultData
      | QuickHitResultData
      | ReactionResultData
  ) {
    this.firestoreDbService.createDocument(collectionName, {
      ...results,
      user: this.authService.displayName,
      date: formatDate(new Date(), false)
    })
  }

  public async checkIfUserAward() {
    const date = new Date()

    await this.awardsService.checkAndAddUserAward(
      this.authService.uid,
      AWARD_IDS.GENERAL_02_FIRST_TRAINING
    )

    if (await this.allTrainingsDone()) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.GENERAL_03_ALL_TRAININGS
      )
    }

    const hours = date.getHours()
    if (hours >= 0 && hours <= 4) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.GENERAL_04_NIGHT_OWL
      )
    }
    if (hours >= 5 && hours <= 7) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.GENERAL_05_EARLY_BIRD
      )
    }

    const day = date.getDay()
    if (day === 0 || day === 6) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.GENERAL_06_WEEKEND
      )
    }

    if (await this.oneTrainingStreakCheck()) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.GENERAL_07_STREAK
      )
    }

    if (await this.allTrainingsStreakCheck()) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.GENERAL_08_ALL_STREAK
      )
    }
  }

  public async checkTargetAward(results: TargetResultData) {
    if (results.averagePrecision >= 80) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.TARGET_SHOOTING_01_SHOOTER
      )
    }
    if (results.averagePrecision >= 90) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.TARGET_SHOOTING_02_SNIPER
      )
    }
    if (results.averageTime < 1000 && results.averageTime > 250) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.TARGET_SHOOTING_03_FAST
      )
    }
    if (results.averageTime < 750 && results.averageTime > 250) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.TARGET_SHOOTING_04_FASTER
      )
    }
    if (results.points >= 2400) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.TARGET_SHOOTING_05_POINTS
      )
    }
    if (results.points >= 2400) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.TARGET_SHOOTING_05_POINTS
      )
    }
    if (results.points >= 2750) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.TARGET_SHOOTING_06_POINTS2
      )
    }
    if (results.points >= 3000) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.TARGET_SHOOTING_07_POINTS3
      )
    }
  }

  public async checkMovingTargetAward(results: MovingTargetResultData) {
    if (results.points >= 3500) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.MOVING_TARGET_01_POINTS
      )
    }

    if (results.points >= 4000) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.MOVING_TARGET_02_POINTS2
      )
    }

    if (results.points >= 4500) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.MOVING_TARGET_03_POINTS3
      )
    }

    if (results.perfectAim) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.MOVING_TARGET_04_AIMBOT
      )
    }
  }

  public async checkQuickHitAward(results: QuickHitResultData) {
    if (results.points >= 50) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.QUICK_HIT_01_POINTS
      )
    }

    if (results.points >= 85) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.QUICK_HIT_02_POINTS2
      )
    }

    if (results.points >= 110) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.QUICK_HIT_03_POINTS3
      )
    }

    if (results.ctHits >= 5) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.QUICK_HIT_04_FDP
      )
    }

    if (results.perfectStreak) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.QUICK_HIT_05_STREAK
      )
    }
  }

  public async checkReactionAward(results: ReactionResultData) {
    if (results.averageReactionTime <= 350) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.REACTION_01_FAST
      )
    }

    if (results.averageReactionTime < 275) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.REACTION_02_FASTER
      )
    }

    if (results.averageReactionTime < 230) {
      await this.awardsService.checkAndAddUserAward(
        this.authService.uid,
        AWARD_IDS.REACTION_03_FASTEST
      )
    }
  }

  private async allTrainingsDone() {
    let allTrainingsDone = true

    for (const collectionId of Object.values(TRAINING_COLLECTION_IDS)) {
      await this.firestoreDbService
        .getMultipleDocumentsFromCollection(collectionId, {
          customQuery: [
            {
              property: 'user',
              operator: '==',
              value: this.authService.displayName
            }
          ]
        })
        .then((data) => {
          if (data.docs.length === 0) {
            allTrainingsDone = false
          }
        })
    }
    return allTrainingsDone
  }

  private async oneTrainingStreakCheck() {
    let oneTrainingStreak = true
    let trainings: UserTraining[] = []

    for (const collectionId of Object.values(TRAINING_COLLECTION_IDS)) {
      await this.firestoreDbService
        .getMultipleDocumentsFromCollection(collectionId, {
          customQuery: [
            {
              property: 'user',
              operator: '==',
              value: this.authService.displayName
            }
          ]
        })
        .then((data) => {
          if (data.docs.length > 0) {
            trainings = [
              ...trainings,
              ...data.docs.map((doc) => doc.data() as UserTraining)
            ]
          }
        })
    }

    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return formatDate(date, false)
    })

    for (const date of lastSevenDays) {
      if (!trainings.some((training) => training.date === date)) {
        oneTrainingStreak = false
        break
      }
    }

    return oneTrainingStreak
  }

  private async allTrainingsStreakCheck() {
    let allTrainingStreak = true

    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return formatDate(date, false)
    })

    for (const collectionId of Object.values(TRAINING_COLLECTION_IDS)) {
      await this.firestoreDbService
        .getMultipleDocumentsFromCollection(collectionId, {
          customQuery: [
            {
              property: 'user',
              operator: '==',
              value: this.authService.displayName
            }
          ]
        })
        .then((data) => {
          if (data.docs.length > 0) {
            for (const date of lastSevenDays) {
              if (!data.docs.some((doc) => doc.data()['date'] === date)) {
                allTrainingStreak = false
                break
              }
            }
          } else {
            allTrainingStreak = false
          }
        })
    }

    return allTrainingStreak
  }
}
