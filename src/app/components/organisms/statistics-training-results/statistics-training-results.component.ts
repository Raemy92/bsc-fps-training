import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core'
import { ApexOptions, ChartComponent, NgApexchartsModule } from 'ng-apexcharts'
import { TrainingStatistics } from '../../../models/training/training.dto'

@Component({
  selector: 'app-statistics-training-results',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    <div class="col-span-2 justify-center w-full chart">
      <apx-chart
        #chart
        [series]="chartOptions.series!"
        [chart]="chartOptions.chart!"
        [dataLabels]="chartOptions.dataLabels!"
        [stroke]="chartOptions.stroke!"
        [markers]="chartOptions.markers!"
        [tooltip]="chartOptions.tooltip!"
        [legend]="chartOptions.legend!"
      ></apx-chart>
    </div>
  `,
  styles: ``
})
export class StatisticsTrainingResultsComponent
  implements OnInit, AfterViewInit
{
  @Input({ required: true }) statistics!: TrainingStatistics
  public chartOptions: Partial<ApexOptions> = {}
  @ViewChild('chart') chart!: ChartComponent

  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          name: this.statistics.reaction[0].name,
          data: this.statistics.reaction.map((stat) =>
            parseFloat((10000 - stat.points).toFixed(2))
          )
        },
        {
          name: this.statistics.target[0].name,
          data: this.statistics.target.map((stat) => stat.points)
        },
        {
          name: this.statistics.movingTarget[0].name,
          data: this.statistics.movingTarget.map((stat) => stat.points)
        },
        {
          name: this.statistics.quickHit[0].name,
          data: this.statistics.quickHit.map((stat) => stat.points)
        }
      ],
      chart: {
        type: 'line',
        foreColor: '#fff',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        height: 475,
        width: '100%',
        events: {
          legendClick: (chart: any, seriesIndex: number, options?: any) => {
            this.showAndHideSeries(seriesIndex)
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      markers: {
        size: 6,
        hover: {
          sizeOffset: 6
        }
      },
      tooltip: {
        theme: 'dark'
      },
      legend: {
        onItemClick: {
          toggleDataSeries: false
        },
        onItemHover: {
          highlightDataSeries: false
        }
      }
    }
  }

  private showAndHideSeries(seriesIndex: number) {
    this.chart.series.forEach((serie, index) => {
      if (typeof serie === 'object' && serie !== null && 'name' in serie) {
        if (index !== seriesIndex) {
          this.chart.hideSeries(serie.name!)
        } else {
          this.chart.showSeries(serie.name!)
        }
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.chart.hideSeries(this.statistics.target[0].name)
      this.chart.hideSeries(this.statistics.movingTarget[0].name)
      this.chart.hideSeries(this.statistics.quickHit[0].name)
    }, 0)
  }
}
