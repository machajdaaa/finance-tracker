import {Component, effect, inject} from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import {FINANCE_CHART_OPTIONS, FINANCE_CHART_DATA, buildChartData} from '../../core/constants/chart-config';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, CommonModule, CurrencyPipe, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private transactionService = inject(TransactionService)

  expenses = this.transactionService.totalExpenses;
  income = this.transactionService.totalIncome;
  balance = this.transactionService.balance;

  chartOptions = FINANCE_CHART_OPTIONS;
  chartData = { ...FINANCE_CHART_DATA };

  constructor() {
    effect(() => {
      const transactions = this.transactionService.transactions();
      const incomeByMonth = new Array(12).fill(0);
      const expensesByMonth = new Array(12).fill(0);

      const currentYear = new Date().getFullYear();

      transactions.forEach(t => {
        if (new Date(t.date).getFullYear() === currentYear) {
          const month = new Date(t.date).getMonth();
          if (t.type === 'income') {
            incomeByMonth[month] += t.amount;
          } else {
            expensesByMonth[month] += t.amount;
          }
        }
      });

      this.chartData = buildChartData(incomeByMonth, expensesByMonth);
    });
  }
}
