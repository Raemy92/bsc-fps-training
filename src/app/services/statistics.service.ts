import { Injectable } from '@angular/core'
import {
  TrainingByUser,
  TrainingStatistics,
  TrainingStatisticsGeneral,
  TrainingStatisticsTraining
} from '../models/training/training.dto'
import { TRAINING_COLLECTION_IDS } from '../resources/constants.resources'
import { convertStringToDate } from '../utils/date.util'

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  public getGeneralStatistics(
    trainingsByUser: TrainingByUser[]
  ): TrainingStatisticsGeneral[] {
    const uniqueIds = [
      ...new Set(trainingsByUser.map((training) => training.id))
    ]

    const trainings: TrainingStatisticsGeneral[] = uniqueIds.map((id) => {
      const trainingsById = trainingsByUser.filter(
        (training) => training.id === id
      )
      const bestTraining = trainingsById.reduce((prev, current) =>
        prev.points > current.points ? prev : current
      )
      return {
        id,
        name: bestTraining.name,
        bestUserResult: bestTraining.points,
        numberOfTrainingsDone: trainingsById.length
      }
    })

    return trainings
  }

  public getTrainingStatistics(
    trainingByUser: TrainingByUser[]
  ): TrainingStatistics {
    let trainingStatistics: TrainingStatistics = {
      reaction: [],
      target: [],
      movingTarget: [],
      quickHit: []
    }

    trainingByUser.sort((a, b) => {
      return (
        convertStringToDate(a.date).getTime() -
        convertStringToDate(b.date).getTime()
      )
    })

    for (let training of trainingByUser) {
      let trainingStats: TrainingStatisticsTraining = {
        id: training.id,
        name: training.name,
        points: training.points,
        date: training.date
      }

      switch (training.id) {
        case TRAINING_COLLECTION_IDS.REACTION:
          trainingStatistics.reaction.push(trainingStats)
          break
        case TRAINING_COLLECTION_IDS.TARGET:
          trainingStatistics.target.push(trainingStats)
          break
        case TRAINING_COLLECTION_IDS.MOVING_TARGET:
          trainingStatistics.movingTarget.push(trainingStats)
          break
        case TRAINING_COLLECTION_IDS.QUICK_HIT:
          trainingStatistics.quickHit.push(trainingStats)
          break
      }
    }

    return trainingStatistics
  }
}
