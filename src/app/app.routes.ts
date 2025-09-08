import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'quizz',
    loadComponent: () => import('./pages/quizz/quizz.page').then((m) => m.QuizzComponent),
  },
  {
    path: '',
    redirectTo: 'quizz',
    pathMatch: 'full',
  },
];
