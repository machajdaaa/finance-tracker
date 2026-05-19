import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {TransactionService} from '../../../core/services/transaction.service';
import {CATEGORY_LABELS, TransactionCategory} from '../../../core/models/transaction.model';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-transaction-filter',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './transaction-filter.component.html',
  styleUrl: './transaction-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFilterComponent {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  categoryLabels = CATEGORY_LABELS;
  categories = Object.keys(CATEGORY_LABELS) as TransactionCategory[];

  form = this.fb.group({
    search: [''],
    type: ['all'],
    category: ['all'],
  });

  constructor() {
    this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.transactionService.updateFilter({
        search: value.search ?? '',
        type: value.type as any,
        category: value.category as any,
      });
    });
  }
}
