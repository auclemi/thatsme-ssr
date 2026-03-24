import { Routes } from '@angular/router';
// import { AdminLogsComponent } from './admin-logs/admin-logs';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'developpement-front-end-angular',
    loadComponent: () =>
      import('./pages/wp-component/wp-component').then(m => m.WpComponent)
  },
  {
    path: 'audit-accessibility',
    loadComponent: () =>
      import('./pages/wp-component/wp-component').then(m => m.WpComponent)
  },
  {
    path: 'site-creation',
    loadComponent: () =>
      import('./pages/wp-component/wp-component').then(m => m.WpComponent)
  },
  {
    path: 'mise-en-conformite-accessibilite-wacg',
    loadComponent: () =>
      import('./pages/wp-component/wp-component').then(m => m.WpComponent)
  },
  {
    path: 'formation-action',
    loadComponent: () =>
      import('./pages/wp-component/wp-component').then(m => m.WpComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact-form.component').then(m => m.ContactFormComponent)
  },
//   { path: 'admin-logs', component: AdminLogsComponent },
  
// {
//     path: 'admin-logs',
//     loadComponent: () =>
//       import('./admin-logs/admin-logs').then(m => m.AdminLogsComponent)
//   },
]
