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

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: 'Jídlo',
  transport: 'Doprava',
  housing: 'Bydlení',
  entertainment: 'Zábava',
  health: 'Zdraví',
  shopping: 'Nákupy',
  other: 'Ostatní',
};

export const INCOME_CATEGORY_LABELS: Record<IncomeCategory, string> = {
  salary: 'Plat',
  freelance: 'Freelance',
  other: 'Ostatní',
};

export const CATEGORY_LABELS: Record<TransactionCategory, string> = {
  ...EXPENSE_CATEGORY_LABELS,
  ...INCOME_CATEGORY_LABELS,
};

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  description: string;
  date: string;
}
