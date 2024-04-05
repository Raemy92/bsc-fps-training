export type Award = {
  id: string
  name: string
  description: string
  image: string | undefined
  dateApplied: Date | undefined
}

export type UserAward = {
  awardId: string
  dateApplied: Date
}
