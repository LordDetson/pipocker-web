import {Component, OnInit} from '@angular/core';
import {ChartData, ChartType, ChartEvent, ChartOptions, ChartConfiguration} from "chart.js";
import {Observable} from "rxjs";
import {VotingResult} from "../../models/voting-result.model";
import * as RoomSelector from "../../store/room/room.selector";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-voting-result-chart',
  templateUrl: './voting-result-chart.component.html',
  styleUrls: ['./voting-result-chart.component.css']
})
export class VotingResultChartComponent implements OnInit {

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    rotation: -90,
    cutout: "30%",
    circumference: 180,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 800,
      easing: "easeOutCirc"
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        formatter: function(value, context) {
          return context.chart.data.labels ? context.chart.data.labels[context.dataIndex] + ": " + value : value;
        },
        font: {
          family: "Rubik Medium",
          size: 16
        },
        textAlign: "center",
        align: "end"
      }
    }
  }

  votingResult$: Observable<VotingResult> = this.store.select(RoomSelector.votingResultSelector);

  initialized: boolean;

  constructor(
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.initialized = true;
    this.votingResult$.subscribe(votingResult => {
      this.doughnutChartData.labels = [];
      this.doughnutChartData.datasets = [];
      let countOfVotes : number[] = [];
      votingResult.map.forEach((card, key) => {
        const index : number = this.doughnutChartData.labels!.indexOf(card.value);
        if (index > -1) {
          countOfVotes.splice(index, 1, countOfVotes.at(index)! + 1);
        } else {
          this.doughnutChartData.labels!.push(card.value);
          countOfVotes.push(1)
        }
      })
      this.doughnutChartData.datasets.push({data: countOfVotes});
    })
  }
}
