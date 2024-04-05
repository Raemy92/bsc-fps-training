import { Component, Input, OnInit } from '@angular/core'
import { TrainingStatisticsGeneral } from '../../../models/training/training.dto'
import { NgForOf } from '@angular/common'
import { TRAINING_COLLECTION_IDS } from '../../../resources/constants.resources'
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-statistics-general-info',
  standalone: true,
  imports: [NgForOf, NgApexchartsModule],
  template: `
    <div class="grid grid-cols-2 gap-1">
      <span class="font-bold">Trainings insgesamt abgeschlossen:</span>
      <span class="font-bold font-italic text-success font-giant">{{
        numberOfTrainingsDone(statistics)
      }}</span>
      <span class="font-bold">Beliebtestes Training:</span>
      <span class="font-bold font-italic text-success font-giant">{{
        mostPopularTraining(statistics)
      }}</span>
      <span class="col-span-2 font-bold mt-2">Beste Ergebnisse:</span>
      <div
        class="col-span-2 grid grid-cols-2 gap-1"
        *ngFor="let statistic of statistics"
      >
        <span>{{ statistic.name }}:</span>
        <span class="font-bold font-italic text-success font-giant">{{
          bestUserResult(statistic)
        }}</span>
      </div>
      <span class="col-span-2 font-bold mt-2">Trainingsverteilung:</span>
      <div class="col-span-2 flex justify-center w-full chart">
        <apx-chart
          [series]="pieChartOptions.series!"
          [chart]="pieChartOptions.chart!"
          [labels]="pieChartOptions.labels!"
          [legend]="pieChartOptions.legend!"
        ></apx-chart>
      </div>
    </div>
  `,
  styles: ``
})
export class StatisticsGeneralInfoComponent implements OnInit {
  @Input({ required: true }) statistics!: TrainingStatisticsGeneral[]
  public pieChartOptions: Partial<ApexOptions> = {}

  ngOnInit() {
    this.pieChartOptions = {
      series: this.statistics.map((stat) => stat.numberOfTrainingsDone),
      chart: {
        type: 'donut',
        width: '100%',
        foreColor: '#fff',
        offsetY: 20
      },
      labels: this.statistics.map((stat) => stat.name),
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      }
    }
  }

  protected numberOfTrainingsDone(
    statistics: TrainingStatisticsGeneral[]
  ): number {
    return statistics.reduce((acc, curr) => acc + curr.numberOfTrainingsDone, 0)
  }

  protected bestUserResult(statistic: TrainingStatisticsGeneral): string {
    return statistic.id === TRAINING_COLLECTION_IDS.REACTION
      ? `${(10000 - (statistic.bestUserResult || 0)).toFixed(2)} ms`
      : `${statistic.bestUserResult} Punkte`
  }

  protected mostPopularTraining(
    statistics: TrainingStatisticsGeneral[]
  ): string {
    const mostPopular = statistics.reduce((prev, current) =>
      prev.numberOfTrainingsDone > current.numberOfTrainingsDone
        ? prev
        : current
    )
    return `${mostPopular.name} (${mostPopular.numberOfTrainingsDone}x)`
  }
}
