import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionFilterComponent } from '../transaction-filter/transaction-filter.component';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    TranslateModule,
    TransactionFilterComponent,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  private readonly transactionService = inject(TransactionService);
  private readonly dialog = inject(MatDialog);

  transactions$ = this.transactionService.filteredTransactions$;
  displayedColumns = ['date', 'description', 'category', 'amount', 'actions'];

  deleteTransaction(id: string): void {
    this.transactionService.deleteTransaction(id);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(TransactionFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.addTransaction(result);
      }
    });
  }
}
