import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'transactions',
    loadComponent: () => import('./features/transactions/transaction-list/transaction-list.component').then(m => m.TransactionListComponent),
  },
  {
    path: 'statistics',
    loadComponent: () => import('./features/statistics/statistics.component').then(m => m.StatisticsComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];
