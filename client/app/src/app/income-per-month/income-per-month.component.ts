import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart/chart';
import { PaymentService } from '../_services/payment.service';

@Component({
  selector: 'app-income-per-month',
  templateUrl: './income-per-month.component.html',
  styleUrls: ['./income-per-month.component.css'],
})
export class IncomePerMonthComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  chartOptions: any;
  income21: number[] =  new Array(12).fill(0);
  income22: number[] =  new Array(12).fill(0);

  @ViewChild('chart') chart?: UIChart;

  constructor(public paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.getAll().subscribe({
      next: (values) => {
        values.sort(function (a: any, b: any) {
          var x = a.date.toLowerCase();
          var y = b.date.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
        values.forEach((item: any) => {
          if (new Date(item.date).getFullYear() == 2022) {
            let monthIndex = new Date(item.date).getMonth();
            this.income22[monthIndex] += item.charges;
          } else if (new Date(item.date).getFullYear() == 2021) {
            let monthIndex = new Date(item.date).getMonth();
            this.income21[monthIndex] += item.charges;
          }
        });
        this.chart?.refresh();
      },
      error: (err) => console.error(err),
    });

    this.basicData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'income 2021',
          backgroundColor: '#6878d5',
          data: this.income21,
        },
        {
          label: 'income 2022',
          backgroundColor: '#ff9999',
          data: this.income22,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }
}
