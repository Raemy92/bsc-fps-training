import { Component, HostListener, OnInit } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import {
  NbActionsModule,
  NbButtonModule,
  NbIconModule,
  NbLayoutModule
} from '@nebular/theme'
import { AuthService } from './services/auth.service'
import { AsyncPipe, NgIf } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    AsyncPipe,
    NgIf,
    NbActionsModule
  ],
  template: `<nb-layout>
    <nb-layout-header fixed>
      <div class="nav-menu" *ngIf="authService.loggedIn$ | async">
        <button
          nbButton
          status="primary"
          ghost
          (click)="navigateToPage('dashboard')"
        >
          <nb-icon icon="home-outline"></nb-icon>
          Dashboard
        </button>
        <button
          nbButton
          status="primary"
          ghost
          (click)="navigateToPage('training')"
        >
          <nb-icon icon="play-circle-outline"></nb-icon>
          Training
        </button>
        <button
          nbButton
          status="primary"
          ghost
          (click)="navigateToPage('awards')"
        >
          <nb-icon icon="award-outline"></nb-icon>
          Auszeichnungen
        </button>
        <button
          nbButton
          status="primary"
          ghost
          (click)="navigateToPage('statistics')"
        >
          <nb-icon icon="pie-chart-outline"></nb-icon>
          statistiken
        </button>
        <button nbButton status="danger" ghost (click)="logout()" size="large">
          <nb-icon icon="log-out-outline"></nb-icon>
        </button>
      </div>
    </nb-layout-header>
    <nb-layout-column class="layout-content">
      @if (width < acceptedWidth) {
        <div class="flex justify-center align-center">
          <h3>
            Bitte eine Bildschirmbreite von 1'600 Pixeln oder mehr verwenden!
          </h3>
        </div>
      } @else {
        <router-outlet></router-outlet>
      }
    </nb-layout-column>
    <nb-layout-footer fixed
      >B.Sc. Inf, created by L. Raemy | v 1.1.3</nb-layout-footer
    >
  </nb-layout>`,
  styles: `
    .layout-content {
      max-width: 1920px;
      margin: 0 auto;
    }

    .nav-menu {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 2rem;
    }
  `
})
export class AppComponent implements OnInit {
  title = 'FPS Training App'
  width: number = window.innerWidth
  height: number = window.innerHeight
  acceptedWidth: number = 1600

  constructor(
    protected readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.getInitSize()
  }

  private getInitSize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
  }

  @HostListener('window:resize', ['$event'])
  protected onWindowResize(event: any) {
    this.width = event.target.innerWidth
    this.height = event.target.innerHeight
  }

  public navigateToPage(page: string) {
    this.router.navigate([page])
  }

  public logout(): void {
    this.authService.logout()
  }
}
