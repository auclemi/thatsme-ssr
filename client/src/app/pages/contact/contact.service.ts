import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

export interface ContactPayload {
  fullName: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private stateSubject = new BehaviorSubject<'INITIAL' | 'LOADING' | 'DONE' | 'ERROR'>('INITIAL');
  state$ = this.stateSubject.asObservable();

  private readonly apiUrl = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) {}

  setState(state: 'INITIAL' | 'LOADING' | 'DONE' | 'ERROR') {
    this.stateSubject.next(state);
  }

  sendContact(payload: any): void {
    this.setState('LOADING');

    this.http.post(this.apiUrl, payload).pipe(
      tap(() => this.setState('DONE')),
      catchError(err => {
        this.setState('ERROR');
        throw err;
      })
    ).subscribe();
  }
}
