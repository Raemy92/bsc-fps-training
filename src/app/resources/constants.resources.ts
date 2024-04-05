export const TRAINING_COLLECTION_IDS = {
  TARGET: 'results-target-training',
  MOVING_TARGET: 'results-moving-target-training',
  QUICK_HIT: 'results-quick-hit-training',
  REACTION: 'results-reaction-training'
}

export const TRAININGS_NAME: Map<string, string> = new Map([
  [TRAINING_COLLECTION_IDS.TARGET, 'Target Shooting'],
  [TRAINING_COLLECTION_IDS.MOVING_TARGET, 'Moving Target'],
  [TRAINING_COLLECTION_IDS.QUICK_HIT, 'Quick Hit'],
  [TRAINING_COLLECTION_IDS.REACTION, 'Reaction']
])

export const USER_COLLECTION_ID = 'users'

export const AWARD_IDS = {
  GENERAL_01_FIRST_LOGIN: '1-general-01-first-login',
  GENERAL_02_FIRST_TRAINING: '1-general-02-first-training',
  GENERAL_03_ALL_TRAININGS: '1-general-03-all-trainings',
  GENERAL_04_NIGHT_OWL: '1-general-04-night-owl',
  GENERAL_05_EARLY_BIRD: '1-general-05-early-bird',
  GENERAL_06_WEEKEND: '1-general-06-weekend',
  GENERAL_07_STREAK: '1-general-07-streak',
  GENERAL_08_ALL_STREAK: '1-general-08-all-streak',
  TARGET_SHOOTING_01_SHOOTER: '2-target-shooting-01-shooter',
  TARGET_SHOOTING_02_SNIPER: '2-target-shooting-02-sniper',
  TARGET_SHOOTING_03_FAST: '2-target-shooting-03-fast',
  TARGET_SHOOTING_04_FASTER: '2-target-shooting-04-faster',
  TARGET_SHOOTING_05_POINTS: '2-target-shooting-05-points',
  TARGET_SHOOTING_06_POINTS2: '2-target-shooting-06-points2',
  TARGET_SHOOTING_07_POINTS3: '2-target-shooting-07-points3',
  MOVING_TARGET_01_POINTS: '3-moving-target-01-points',
  MOVING_TARGET_02_POINTS2: '3-moving-target-02-points2',
  MOVING_TARGET_03_POINTS3: '3-moving-target-03-points3',
  MOVING_TARGET_04_AIMBOT: '3-moving-target-04-aimbot',
  QUICK_HIT_01_POINTS: '4-quick-hit-01-points',
  QUICK_HIT_02_POINTS2: '4-quick-hit-02-points2',
  QUICK_HIT_03_POINTS3: '4-quick-hit-03-points3',
  QUICK_HIT_04_FDP: '4-quick-hit-04-fdp',
  QUICK_HIT_05_STREAK: '4-quick-hit-05-streak',
  REACTION_01_FAST: '5-reaction-01-fast',
  REACTION_02_FASTER: '5-reaction-02-faster',
  REACTION_03_FASTEST: '5-reaction-03-fastest'
}
