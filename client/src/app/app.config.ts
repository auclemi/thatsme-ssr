import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';

/**
 * 
 * @returns isSsrMode by default = true on prod and false on dev
 */
function isSsrMode(): boolean {
  if (typeof window === 'undefined') return true; // toujours SSR côté serveur

  const urlParams = new URLSearchParams(window.location.search);
  const ssr = urlParams.get('ssr');
  let isSsr = true; // by default ssr = false in dev
  if (isDevMode()) {
    isSsr = ssr === 'true' ? true : false; // in dev we can activate ssr mode with url param ssr=true
  } else if (!isDevMode()) {
    isSsr = ssr === 'false' ? false : true; // in prod we can cancel ssr mode with url param ssr=false
  }
  console.log('isSsrMode:', isSsr, '| isDevMode:', isDevMode(), '| url:', window.location.search);
  return isSsr;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    ...(isSsrMode() ? [provideClientHydration()] : []),
    // ...(isSsrMode() ? [] : []),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};