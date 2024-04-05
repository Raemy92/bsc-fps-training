export type Training = {
  id: string
  name: string
  shortDescription: string
  longDescription: string
  image: string | undefined
  resultsCollection: string
  leader:
    | {
        name: string
        points: number
      }
    | undefined
}

export type TrainingByUser = {
  id: string
  name: string
  points: number
  date: string
  averagePrecision: number | undefined
  averageTime: number | undefined
  averageReactionTime: number | undefined
  cHits: number | undefined
  highestStreak: number | undefined
  perfectStreak: boolean | undefined
  perfectAim: boolean | undefined
}

export type TrainingStatisticsGeneral = {
  id: string
  name: string
  bestUserResult: number | undefined
  numberOfTrainingsDone: number
}

export type TrainingStatisticsTraining = {
  id: string
  name: string
  points: number
  date: string
}

export type TrainingStatistics = {
  reaction: TrainingStatisticsTraining[]
  target: TrainingStatisticsTraining[]
  movingTarget: TrainingStatisticsTraining[]
  quickHit: TrainingStatisticsTraining[]
}
