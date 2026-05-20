import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TransactionService } from '../../../core/services/transaction.service';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, TransactionCategory, TransactionType } from '../../../core/models/transaction.model';
import { distinctUntilChanged } from 'rxjs';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './transaction-filter.component.html',
  styleUrl: './transaction-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFilterComponent {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  categories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].filter(
    (v, i, a) => a.indexOf(v) === i
  ) as TransactionCategory[];

  form = this.fb.group({
    search: [''],
    type: ['all'],
    category: ['all'],
  });

  constructor() {
    this.form.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(),
    ).subscribe(value => {
      this.transactionService.updateFilter({
        search: value.search ?? '',
        type: (value.type ?? 'all') as TransactionType | 'all',
        category: (value.category ?? 'all') as TransactionCategory | 'all',
      });
    });
  }
}
