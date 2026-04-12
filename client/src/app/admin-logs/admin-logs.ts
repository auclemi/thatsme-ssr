import { Component, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { MaterialFullModule } from '../shared/material/material-module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.html',
  styleUrls: ['./admin-logs.scss'],
  standalone: true,
  imports: [FormsModule, MaterialFullModule, CommonModule, ReactiveFormsModule]
})
export class AdminLogsComponent {
  // user = '';
  // pass = '';
  output = signal('');
  adminForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  private authHeaders(): HttpHeaders {
    const { user, pass } = this.adminForm.value;
    const token = btoa(`${user}:${pass}`);
    return new HttpHeaders({
      Authorization: `Basic ${token}`
    });
  }

  getLogs() {
    this.output.set('')
    this.http.get(`${environment.apiUrl}/admin/logs`, {
      responseType: 'text',
      headers: this.authHeaders()
    }).subscribe({
      next: res => this.output.set(res),
      error: err => this.output.set('Erreur: ' + err.status)
    });
  }

  deleteLogs() {
    this.output.set('')
    this.http.delete(`${environment.apiUrl}/admin/logs`, {
      responseType: 'text',
      headers: this.authHeaders()
    }).subscribe({
      next: res => this.output.set(res),
      error: err => this.output.set('Erreur: ' + err.status)
    });
  }
}

