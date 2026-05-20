import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { FINANCE_CHART_OPTIONS, buildChartData } from '../../core/constants/chart-config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    CurrencyPipe,
    BaseChartDirective,
    TranslateModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private transactionService = inject(TransactionService);

  expenses = this.transactionService.totalExpenses;
  income = this.transactionService.totalIncome;
  balance = this.transactionService.balance;

  chartOptions = FINANCE_CHART_OPTIONS;

  readonly chartData = computed(() => {
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

    return buildChartData(incomeByMonth, expensesByMonth);
  });
}
