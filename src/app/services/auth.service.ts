import { Injectable } from '@angular/core'
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { FirestoreDbService } from './firestore-db.service'
import { formatDate } from '../utils/date.util'
import { AWARD_IDS } from '../resources/constants.resources'
import { AwardService } from './award.service'
import { ToastService } from './toast.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loggedIn = new BehaviorSubject<boolean>(false)
  public readonly loggedIn$ = this.loggedIn.asObservable()

  constructor(
    private auth: Auth,
    private router: Router,
    private readonly firestoreDbService: FirestoreDbService,
    private readonly awardService: AwardService,
    private readonly toastService: ToastService
  ) {
    this.auth.onAuthStateChanged((user) => {
      user ? this.loggedIn.next(true) : this.loggedIn.next(false)
    })
  }

  public signUp(email: string, password: string, username: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: username })
        this.router.navigate(['/dashboard'])
        this.toastService.showSuccess('Registrierung erfolgreich')
      })
      .catch((error) => {
        this.toastService.showError(error)
      })
  }

  public login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        this.firestoreDbService.updateDocument('users', user.uid, {
          displayName: user.displayName,
          lastSignInTime: formatDate(new Date(), true)
        })
        this.awardService.checkAndAddUserAward(
          user.uid,
          AWARD_IDS.GENERAL_01_FIRST_LOGIN
        )
        this.router.navigate(['/dashboard'])
      })
      .catch((error) => {
        this.toastService.showError(error)
      })
  }

  public logout() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login'])
      })
      .catch((error) => {
        this.toastService.showError(error)
      })
  }

  get displayName(): string {
    return this.auth.currentUser?.displayName || ''
  }

  get uid(): string {
    return this.auth.currentUser?.uid || ''
  }
}
