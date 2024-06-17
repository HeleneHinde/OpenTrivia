import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'trivial',
    loadComponent: () => import('./trivial/trivial.page').then( m => m.TrivialPage)
  },
  {
    path: '',
    redirectTo: 'trivial',
    pathMatch: 'full',
  },
];
