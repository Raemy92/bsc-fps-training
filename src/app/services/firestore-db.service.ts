import { Injectable } from '@angular/core'
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query as fsQuery,
  where,
  orderBy as fsOrderBy,
  limit as fsLimit,
  updateDoc,
  doc
} from '@angular/fire/firestore'
import { QueryOptions } from '../models/query/query.dto'
import { Training, TrainingByUser } from '../models/training/training.dto'
import { TRAININGS_COLLECTION_NAME } from '../components/pages/training-overview/training-overview.config'
import {
  TRAINING_COLLECTION_IDS,
  TRAININGS_NAME,
  USER_COLLECTION_ID
} from '../resources/constants.resources'
import { User } from '../models/user/user.dto'

@Injectable({
  providedIn: 'root'
})
export class FirestoreDbService {
  private trainings: Training[] = []
  private currentUser: User | undefined

  constructor(private readonly firestore: Firestore) {}

  public createDocument(collectionName: string, data: any) {
    const fsCollection = collection(this.firestore, collectionName)
    addDoc(fsCollection, data)
  }

  public async updateDocument(
    collectionName: string,
    documentId: string,
    data: any
  ) {
    const fsDoc = doc(collection(this.firestore, collectionName), documentId)
    await updateDoc(fsDoc, data)
  }

  public getMultipleDocumentsFromCollection(
    collectionName: string,
    options?: QueryOptions
  ) {
    const fsCollection = collection(this.firestore, collectionName)
    let query = fsQuery(fsCollection)

    if (options?.customQuery) {
      options.customQuery.forEach((customQuery) => {
        query = fsQuery(
          query,
          where(customQuery.property, customQuery.operator, customQuery.value)
        )
      })
    }

    if (options?.orderBy) {
      options.orderBy.forEach(([field, direction]) => {
        query = fsQuery(query, fsOrderBy(field, direction || 'asc'))
      })
    }

    if (options?.limit) {
      query = fsQuery(query, fsLimit(options?.limit))
    }

    return getDocs(query)
  }

  public async getTrainings(): Promise<Training[]> {
    if (this.trainings.length) return this.trainings

    const data = await this.getMultipleDocumentsFromCollection(
      TRAININGS_COLLECTION_NAME,
      {
        orderBy: [['order', 'asc']]
      }
    )

    this.trainings = data.docs.map((doc) => doc.data() as Training)
    return this.trainings
  }

  public async getCurrentUser(uid: string = ''): Promise<User> {
    const data = await this.getMultipleDocumentsFromCollection(
      USER_COLLECTION_ID,
      {
        customQuery: [
          {
            property: 'uid',
            operator: '==',
            value: uid
          }
        ]
      }
    )

    this.currentUser = data.docs.map((doc) => doc.data() as User)[0]
    return this.currentUser
  }

  public async getAllTrainingsByUser(
    username: string,
    orderBy: [string, 'asc' | 'desc'][] = [['points', 'desc']]
  ): Promise<TrainingByUser[]> {
    let trainings: TrainingByUser[] = []
    for (const collectionId of Object.values(TRAINING_COLLECTION_IDS)) {
      const data = await this.getMultipleDocumentsFromCollection(collectionId, {
        orderBy,
        customQuery: [
          {
            property: 'user',
            operator: '==',
            value: username
          }
        ]
      })
      trainings = trainings.concat(
        data.docs.map((doc) => {
          const docData = doc.data()
          return {
            id: collectionId,
            name: TRAININGS_NAME.get(collectionId) || '',
            points: docData['points'],
            date: docData['date'],
            averagePrecision: docData['averagePrecision'] || undefined,
            averageTime: docData['averageTime'] || undefined,
            averageReactionTime: docData['averageReactionTime'] || undefined,
            cHits: docData['cHits'] || undefined,
            highestStreak: docData['highestStreak'] || undefined,
            perfectStreak: docData['perfectStreak'] || undefined,
            perfectAim: docData['perfectAim'] || undefined
          }
        })
      )
    }
    return trainings
  }
}
