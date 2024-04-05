import { UserAward } from '../award/award.dto'

export type User = {
  uid: string
  creationTime: Date
  displayName: string
  email: string
  lastSignInTime: Date
  userAwards: UserAward[]
}

export type UserTraining = {
  user: string
  date: string
  points: number
  averageTime?: number
  averagePrecision?: number
  highestStreak?: number
  averageReactionTime?: number
}
