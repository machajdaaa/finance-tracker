import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TransactionService} from '../../../core/services/transaction.service';
import {CATEGORY_LABELS, TransactionCategory} from '../../../core/models/transaction.model';
import {AsyncPipe, CurrencyPipe, DatePipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialog} from '@angular/material/dialog';
import {TransactionFormComponent} from '../transaction-form/transaction-form.component';
import {TransactionFilterComponent} from '../transaction-filter/transaction-filter.component';

@Component({
  selector: 'app-transaction-list',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    TransactionFilterComponent
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent {
  readonly transactionService = inject(TransactionService)
  private readonly dialog = inject(MatDialog);

  transactions$ = this.transactionService.filteredTransactions$;
  categoryLabels = CATEGORY_LABELS;

  displayedColumns = ['date', 'description', 'category', 'amount', 'actions'];

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id);
  }

  getTransactionLabel(category: string): string {
    return this.categoryLabels[category as TransactionCategory];
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(TransactionFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.addTransaction(result);
      }
    })
  }
}
