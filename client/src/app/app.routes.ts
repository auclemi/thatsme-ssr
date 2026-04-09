import { Routes } from '@angular/router';
// import { AdminLogsComponent } from './admin-logs/admin-logs';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home),
    data: { animation: 'HomePage' }
  },
  {
    path: 'prestations-web',
    loadComponent: () =>
      import('./pages/prestations-web/prestations-web.component').then(m => m.PrestationsWebComponent),
    data: { animation: 'PrestationsWebComponent' }

  },
  {
    path: 'developpement-front-end-angular',
    loadComponent: () =>
      import('./pages/wp-component/wp-component').then(m => m.WpComponent),
    data: { animation: 'WpComponent' }

  },
  {
    path: 'audit-accessibility',
    loadComponent: () =>
      import('./pages/wp-component/wp-component').then(m => m.WpComponent),
    data: { animation: 'WpComponent' }
  },
  {
    path: 'site-creation',
    loadComponent: () =>
      import('./pages/wp-component/wp-component').then(m => m.WpComponent),
    data: { animation: 'WpComponent' }
  },
  {
    path: 'mise-en-conformite-accessibilite-wacg',
    loadComponent: () =>
      import('./pages/wp-component/wp-component').then(m => m.WpComponent),
    data: { animation: 'WpComponent' }
  },
  {
    path: 'formation-action',
    loadComponent: () =>
      import('./pages/wp-component/wp-component').then(m => m.WpComponent),
    data: { animation: 'WpComponent' }
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact-form.component').then(m => m.ContactFormComponent),
    data: { animation: 'ContactFormComponent' }
  },
  //   { path: 'admin-logs', component: AdminLogsComponent },

  // {
  //     path: 'admin-logs',
  //     loadComponent: () =>
  //       import('./admin-logs/admin-logs').then(m => m.AdminLogsComponent)
  //   },
]
