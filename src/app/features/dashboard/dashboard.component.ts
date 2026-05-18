import { Component, inject } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { FINANCE_CHART_OPTIONS, FINANCE_CHART_DATA } from '../../core/constants/chart-config';

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
  chartData = FINANCE_CHART_DATA;

}
