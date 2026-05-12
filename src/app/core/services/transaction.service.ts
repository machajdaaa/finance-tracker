import {Transaction, TransactionCategory, TransactionType} from "../models/transaction.model";
import {computed, Injectable, signal} from '@angular/core';
import {BehaviorSubject, combineLatest, debounceTime, map} from 'rxjs';

export interface TransactionFilter {
  search: string;
  type: TransactionType | 'all';
  category: TransactionCategory | 'all';
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly STORAGE_KEY = 'finance_tracker_transactions';

  //Signals - hlavní state
  private _transactions = signal<Transaction[]>(this.loadFromStorage());

  readonly transactions = this._transactions.asReadonly();

  readonly totalIncome = computed(() =>
    this._transactions()
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly totalExpenses = computed(() =>
    this._transactions()
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly balance = computed(() => this.totalIncome() - this.totalExpenses());

  //RxJS - filtrování
  readonly filter$ = new BehaviorSubject<TransactionFilter>({
    search: '',
    type: 'all',
    category: 'all'
  })

  readonly filteredTransactions$ = combineLatest([
    this.filter$.pipe(debounceTime(300)),
  ]).pipe(
    map(([filter]) => {
      return this._transactions().filter(t => {
        const matchesSearch =
          t.description.toLowerCase().includes(filter.search.toLowerCase());
        const matchesType = filter.type ==='all' || t.type === filter.type;
        const matchesCategory = filter.category && filter.category !== 'all';
        return matchesSearch && matchesType && matchesCategory;
      });
    })
  );

  addTransaction(transaction: Omit<Transaction, 'id'>): void {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };

    this._transactions.update(transactions => [newTransaction, ...transactions]);
    this.saveToStorage();
  }

  deleteTransaction(id: string): void {
    this._transactions.update(transactions => transactions.filter(t => t.id === id));
    this.saveToStorage()
  }

  updateFilter(filter: Partial<TransactionFilter>): void {
    this.filter$.next({ ...this.filter$.value, ...filter })
  }

  private saveToStorage(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this._transactions)
    )
  }

  private loadFromStorage(): Transaction[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
