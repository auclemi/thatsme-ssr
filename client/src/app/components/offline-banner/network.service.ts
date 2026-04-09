import { Injectable, signal, computed, inject } from '@angular/core';

export type NetworkStatus = 'online' | 'offline' | 'server-down';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private statusSignal = signal<NetworkStatus>('online');

  // Signals publics
  readonly status = computed(() => this.statusSignal());
  readonly isOffline = computed(() => this.statusSignal() !== 'online');
  readonly isClientOffline = computed(() => this.statusSignal() === 'offline');
  readonly isServerDown = computed(() => this.statusSignal() === 'server-down');

  constructor() {
    if (typeof window === 'undefined') return;

    // État initial
    this.checkNetwork();

    // Événements navigateur
    window.addEventListener('online', () => {
      console.log('✅ Event: online');
      this.checkNetwork(); // re-vérifie le serveur aussi
    });

    window.addEventListener('offline', () => {
      console.log('📵 Event: offline');
      this.statusSignal.set('offline');
    });
  }

  async checkNetwork(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Pas de réseau → certitude client offline
    if (!navigator.onLine) {
      this.statusSignal.set('offline');
      return;
    }

    // Réseau présent → on vérifie si le serveur répond
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const response = await fetch('/api/ping', {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (response.ok || response.status === 204) {
        this.statusSignal.set('online');
      } else {
        this.statusSignal.set('server-down');
      }
    } catch {
      // fetch a échoué mais navigator.onLine était true
      // → le serveur est down (ou réseau instable)
      this.statusSignal.set(navigator.onLine ? 'server-down' : 'offline');
    }
  }
}