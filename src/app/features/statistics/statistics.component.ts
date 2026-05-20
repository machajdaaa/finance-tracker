import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { TransactionCategory } from '../../core/models/transaction.model';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { CATEGORY_CHART_OPTIONS, CATEGORY_COLORS } from '../../core/constants/chart-config';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    MatCardModule,
    BaseChartDirective,
    TranslateModule,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {
  private transactionService = inject(TransactionService);
  private translateService = inject(TranslateService);

  categoryChartOptions = CATEGORY_CHART_OPTIONS;

  readonly expensesByCategory = computed(() => {
    const result: Partial<Record<TransactionCategory, number>> = {};

    this.transactionService.transactions()
      .filter(t => t.type === 'expense')
      .forEach(t => {
        result[t.category] = (result[t.category] ?? 0) + t.amount;
      });

    return result;
  });

  readonly categoryChartData = computed(() => {
    const data = this.expensesByCategory();
    const labels = Object.keys(data).map(k =>
      this.translateService.instant(`CATEGORIES.${k}`)
    );
    const values = Object.values(data);

    return {
      labels,
      datasets: [{
        data: values,
        backgroundColor: CATEGORY_COLORS,
      }],
    };
  });
}
