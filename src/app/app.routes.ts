import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./route/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'trivial/:name/:difficulty',
    loadComponent: () => import('./route/trivial/trivial.page').then( m => m.TrivialPage)
  },
  {
    path: '',
    redirectTo: 'home-game',
    pathMatch: 'full',
  },
  {
    path: 'home-game',
    loadComponent: () => import('./route/home-game/home-game.page').then( m => m.HomeGamePage)
  },
  {
    path: 'score/:score',
    loadComponent: () => import('./route/score/score.page').then( m => m.ScorePage)
  },
];
