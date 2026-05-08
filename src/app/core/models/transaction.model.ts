export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'food'
  | 'transport'
  | 'housing'
  | 'entertainment'
  | 'health'
  | 'shopping'
  | 'salary'
  | 'freelance'
  | 'other';

export const CATEGORY_LABELS: Record<TransactionCategory, string> = {
  food: 'Jídlo',
  transport: 'Doprava',
  housing: 'Bydlení',
  entertainment: 'Zábava',
  health: 'Zdraví',
  shopping: 'Nákupy',
  salary: 'Plat',
  freelance: 'Freelance',
  other: 'Ostatní',
};

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  description: string;
  date: string;
}
