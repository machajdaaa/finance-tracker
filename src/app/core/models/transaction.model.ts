export type TransactionType = 'income' | 'expense';

export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'housing'
  | 'entertainment'
  | 'health'
  | 'shopping'
  | 'other';

export type IncomeCategory =
  | 'salary'
  | 'freelance'
  | 'other';

export type TransactionCategory = ExpenseCategory | IncomeCategory;

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'food', 'transport', 'housing', 'entertainment', 'health', 'shopping', 'other'
];

export const INCOME_CATEGORIES: IncomeCategory[] = [
  'salary', 'freelance', 'other'
];

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  description: string;
  date: string;
}
