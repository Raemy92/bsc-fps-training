import { Component, Input, OnInit } from '@angular/core'
import {
  TargetResultData,
  TrainingTargetComponent
} from '../../organisms/training-target/training-target.component'
import { NbDialogService, NbLayoutModule } from '@nebular/theme'
import { TrainingTargetResultsDialogComponent } from '../../organisms/training-target-results-dialog/training-target-results-dialog.component'
import {
  MovingTargetResultData,
  TrainingMovingTargetComponent
} from '../../organisms/training-moving-target/training-moving-target.component'
import { TrainingMovingTargetResultsDialogComponent } from '../../organisms/training-moving-target-results-dialog/training-moving-target-results-dialog.component'
import { Training } from '../../../models/training/training.dto'
import { Router } from '@angular/router'
import { NgIf } from '@angular/common'
import {
  QuickHitResultData,
  TrainingQuickHitComponent
} from '../../organisms/training-quick-hit/training-quick-hit.component'
import { TrainingQuickHitResultsDialogComponent } from '../../organisms/training-quick-hit-results-dialog/training-quick-hit-results-dialog.component'
import { TrainingReactionResultsDialogComponent } from '../../organisms/training-reaction-results-dialog/training-reaction-results-dialog.component'
import {
  ReactionResultData,
  TrainingReactionComponent
} from '../../organisms/training-reaction/training-reaction.component'
import { TRAINING_COLLECTION_IDS } from '../../../resources/constants.resources'
import { TrainingStartDialogComponent } from '../../organisms/training-start-dialog/training-start-dialog.component'
import { TrainingService } from '../../../services/training.service'

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    TrainingTargetComponent,
    TrainingMovingTargetComponent,
    NgIf,
    TrainingQuickHitComponent,
    TrainingReactionComponent,
    NbLayoutModule
  ],
  template: `
    <nb-layout>
      <nb-layout-column>
        @if (training?.id) {
          <div class="flex justify-center">
            <app-training-target
              *ngIf="training?.id === 'training-target'"
              [trainingStarted]="trainingStarted"
              (trainingEnded)="
                handleTrainingEnded(trainingCollectionIds.TARGET, $event)
              "
            ></app-training-target>
            <app-training-moving-target
              *ngIf="training?.id === 'training-moving-target'"
              [trainingStarted]="trainingStarted"
              (trainingEnded)="
                handleTrainingEnded(trainingCollectionIds.MOVING_TARGET, $event)
              "
            ></app-training-moving-target>
            <app-training-quick-hit
              *ngIf="training?.id === 'training-quick-hit'"
              [trainingStarted]="trainingStarted"
              (trainingEnded)="
                handleTrainingEnded(trainingCollectionIds.QUICK_HIT, $event)
              "
            ></app-training-quick-hit>
            <app-training-reaction
              *ngIf="training?.id === 'training-reaction'"
              [trainingStarted]="trainingStarted"
              (trainingEnded)="
                handleTrainingEnded(trainingCollectionIds.REACTION, $event)
              "
            ></app-training-reaction>
          </div>
        } @else {
          <div class="no-training-selected">Kein Training gefunden</div>
        }
      </nb-layout-column>
    </nb-layout>
  `,
  styles: ``
})
export class TrainingComponent implements OnInit {
  @Input() training: Training | undefined

  public readonly trainingCollectionIds = TRAINING_COLLECTION_IDS
  public trainingStarted = false

  private dialogMapping: { [key: string]: any } = {
    [this.trainingCollectionIds.TARGET]: TrainingTargetResultsDialogComponent,
    [this.trainingCollectionIds.MOVING_TARGET]:
      TrainingMovingTargetResultsDialogComponent,
    [this.trainingCollectionIds.QUICK_HIT]:
      TrainingQuickHitResultsDialogComponent,
    [this.trainingCollectionIds.REACTION]:
      TrainingReactionResultsDialogComponent
  }

  public constructor(
    private readonly dialogService: NbDialogService,
    private readonly router: Router,
    private readonly trainingService: TrainingService
  ) {
    const navigation = this.router.getCurrentNavigation()
    if (navigation && navigation.extras.state) {
      this.training = navigation.extras.state['training'] as Training
    }
  }

  ngOnInit() {
    if (!this.trainingStarted && this.training) {
      this.dialogService
        .open(TrainingStartDialogComponent, {
          closeOnEsc: false,
          closeOnBackdropClick: false,
          hasBackdrop: false,
          context: {
            training: this.training
          },
          dialogClass: 'custom-overlay-pane'
        })
        .onClose.subscribe(() => (this.trainingStarted = true))
    }
  }

  handleTrainingEnded(
    collectionName: string,
    results:
      | TargetResultData
      | MovingTargetResultData
      | QuickHitResultData
      | ReactionResultData
  ) {
    this.trainingStarted = false
    const DialogComponent = this.dialogMapping[collectionName]

    if (!DialogComponent) {
      console.error(
        `No dialog component mapped for collection: ${collectionName}`
      )
      return
    }

    this.dialogService
      .open(DialogComponent, {
        closeOnEsc: true,
        closeOnBackdropClick: false,
        context: {
          trainingData: results
        },
        dialogClass: 'custom-overlay-pane'
      })
      .onClose.subscribe(async () => {
        await this.router.navigate(['/training'])
        this.trainingService.saveTrainingResults(collectionName, results)
        await this.trainingService.checkIfUserAward()
        switch (this.training?.id) {
          case 'training-target':
            await this.trainingService.checkTargetAward(
              results as TargetResultData
            )
            break
          case 'training-moving-target':
            await this.trainingService.checkMovingTargetAward(
              results as MovingTargetResultData
            )
            break
          case 'training-quick-hit':
            await this.trainingService.checkQuickHitAward(
              results as QuickHitResultData
            )
            break
          case 'training-reaction':
            await this.trainingService.checkReactionAward(
              results as ReactionResultData
            )
            break
        }
      })
  }
}
