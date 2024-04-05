import {
  ApplicationConfig,
  EnvironmentProviders,
  importProvidersFrom
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { getFunctions, provideFunctions } from '@angular/fire/functions'
import { getStorage, provideStorage } from '@angular/fire/storage'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import {
  NbDialogModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule
} from '@nebular/theme'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgApexchartsModule } from 'ng-apexcharts'
import { environment } from '../environments/environment'

const provideNebular = (): EnvironmentProviders[] => [
  importProvidersFrom(NbThemeModule.forRoot({ name: 'cosmic' })),
  importProvidersFrom(NbEvaIconsModule),
  importProvidersFrom(NbDialogModule.forRoot()),
  importProvidersFrom(NbSidebarModule.forRoot()),
  importProvidersFrom(NbToastrModule.forRoot())
]

const provideApexcharts = (): EnvironmentProviders[] => [
  importProvidersFrom(NgApexchartsModule)
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          ...environment.firebaseConfig
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideFunctions(() => getFunctions())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(BrowserAnimationsModule),
    ...provideNebular(),
    ...provideApexcharts()
  ]
}
