import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.scss',
  standalone: true,
})
export class ErrorComponent {
  @Input() errorMessage: string = '';
  @Input() instruction: string = '';

}
