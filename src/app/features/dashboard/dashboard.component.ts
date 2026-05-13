import { Component, inject, LOCALE_ID } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import localCs from '@angular/common/locales/cs';
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
  private _transactionService = inject(TransactionService)

  expenses = this._transactionService.totalExpenses;
  income = this._transactionService.totalIncome;
  balance = this._transactionService.balance;

  chartOptions = FINANCE_CHART_OPTIONS;
  chartData = FINANCE_CHART_DATA;

}
