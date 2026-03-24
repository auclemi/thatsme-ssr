import { Injectable, signal, computed, Signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
    // base signals (writable internally)
    private readonly _title = signal<string>('');

    // exposed readonly signals
    readonly title: Signal<string> = computed( this._title);

    setTitle(newTitle: string): void {
        setTimeout(() => {
            this._title.set(newTitle);
        }, 1000);
    }
}    