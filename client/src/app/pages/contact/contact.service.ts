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
  
  private stateSubject = new BehaviorSubject<string>('INITIAL');
  private readonly apiUrl = `${environment.apiUrl}/api/contact`;
// Expose as observables for component signals
  state$ = this.stateSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  
  sendContact(payload: any):void  { 
    this.stateSubject.next('LOADING');
      this.http.post(this.apiUrl, payload).pipe(
            catchError(err => {
              this.stateSubject.next('ERROR');
              throw err;
            }),
          ).subscribe(
            () => this.stateSubject.next('DONE')
          );
  }
}
