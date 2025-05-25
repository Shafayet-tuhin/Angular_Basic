import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full', // Now, imagine searching for words that start with "cat". You'd expect to find "cat", "catalog", and "category".
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((x) => x.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (x) => x.DashboardComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full',
      },
      {
        path: 'reports',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/dashboard/reports/reports.component').then(
                (x) => x.ReportsComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/dashboard/reports/details/details.component').then(
                (x) => x.DetailsComponent
              ),
          }
        ],
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/dashboard/projects/projects.component').then(
                (x) => x.ProjectsComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/dashboard/projects/edits/edits.component').then(
                (x) => x.EditsComponent
              ),
          },
        ],
      },
      {
        path: 'settings',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            (x) => x.SettingsComponent
          ),
      },
      {
        path: 'NotFound',
        loadComponent: () =>
          import(
            './pages/dashboard/page-not-found/page-not-found.component'
          ).then((x) => x.PageNotFoundComponent),
      },
      {
        path: '**',
        redirectTo: 'NotFound',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'projects',
  },
];
