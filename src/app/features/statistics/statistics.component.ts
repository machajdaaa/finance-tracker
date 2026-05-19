import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {TransactionService} from '../../core/services/transaction.service';
import {CATEGORY_LABELS, TransactionCategory} from '../../core/models/transaction.model';
import {MatCardModule} from '@angular/material/card';
import {BaseChartDirective} from 'ng2-charts';
import {CATEGORY_CHART_OPTIONS, CATEGORY_COLORS} from '../../core/constants/chart-config';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    MatCardModule,
    BaseChartDirective,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {
  private transactionService = inject(TransactionService);

  categoryChartOptions = CATEGORY_CHART_OPTIONS;

  get expensesByCategory() {
    const transactions = this.transactionService.transactions();
    const result: Partial<Record<TransactionCategory, number>> = {};

    transactions
      .filter( t=> t.type === 'expense')
      .forEach(t => {
        result[t.category] = (result[t.category] ?? 0) + t.amount;
      });

    return result;
  }

  get categoryChartData() {
    const data = this.expensesByCategory;
    const labels = Object.keys(data).map(k => CATEGORY_LABELS[k as TransactionCategory]);
    const values = Object.values(data);

    return {
      labels,
      datasets: [{
        data: values,
        backGroundColor: CATEGORY_COLORS,
      }],
    };
  }
}
