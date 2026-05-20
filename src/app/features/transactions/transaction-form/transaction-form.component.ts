import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, TransactionCategory, TransactionType } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TransactionFormComponent>);

  types: { value: TransactionType; labelKey: string }[] = [
    { value: 'income', labelKey: 'TRANSACTIONS.INCOME' },
    { value: 'expense', labelKey: 'TRANSACTIONS.EXPENSE' },
  ];

  form = this.fb.group({
    type: ['expense' as TransactionType, Validators.required],
    category: ['other' as TransactionCategory, Validators.required],
    amount: [null as number | null, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required],
    date: [new Date(), Validators.required],
  });

  constructor() {
    this.form.get('type')?.valueChanges.subscribe(() => {
      this.form.get('category')?.setValue('other' as TransactionCategory);
    });
  }

  get categories() {
    const type = this.form.get('type')?.value;
    return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  }

  submit(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue();
    this.dialogRef.close({
      type: value.type,
      category: value.category,
      amount: value.amount,
      description: value.description,
      date: (value.date as Date).toISOString(),
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
