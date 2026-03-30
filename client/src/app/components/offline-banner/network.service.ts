import { Injectable, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private offlineSignal = signal(false);
  private router = inject(Router);

  constructor() {
      if (typeof window !== 'undefined') {
      console.log('🚀 NetworkService init, navigator.onLine =', navigator.onLine);

      if (!navigator.onLine) {
        console.log('📵 Offline détecté au boot');
        this.offlineSignal.set(true);
      }

      this.checkNetwork();

      window.addEventListener('online', () => {
        console.log('✅ Event: online');
        this.offlineSignal.set(false);
      });

      window.addEventListener('offline', () => {
        console.log('❌ Event: offline');
        this.offlineSignal.set(true);
      });
    }

  }

    async checkNetwork() {
    if (!navigator.onLine) {
      this.offlineSignal.set(true);
      return;
    }

    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1500);

      const response = await fetch('/api/ping', {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      });

      if (response.ok || response.status === 204) {
        // console.log('✅ online');
        this.offlineSignal.set(false);
      } else {
        // console.warn('❌ ping failed, status =', response.status);
        this.offlineSignal.set(true);
      }
    } catch (e: any) {
      console.warn('❌ offline', e?.name);
      this.offlineSignal.set(true);
    }
  }
  offline() {
    return this.offlineSignal();
  }
}
