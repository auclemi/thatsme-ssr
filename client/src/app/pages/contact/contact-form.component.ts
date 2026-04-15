import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from './contact.service';
import { MaterialFullModule } from '../../shared/material/material-module';
import { ErrorComponent } from "../../components/error/error.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  imports: [ReactiveFormsModule, MaterialFullModule, ErrorComponent, JsonPipe],
  styleUrl: './contact-form.component.scss',
  standalone: true,
})
export class ContactFormComponent {
  contactForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isFormError = false;
  public contactState;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.contactState = toSignal(this.contactService.state$, { initialValue: 'INITIAL' });

  }
  ngOnInit() {
    this.contactService.setState('INITIAL');
  }
  submit() {
    if (this.contactState() !== 'INITIAL') return;
    // validation message for accessibility, only for screenreaders
    this.isFormError = false;
    if (this.contactForm?.invalid ) {
      setTimeout(() => {
        this.isFormError = true;
      }, 100);
      return;
    }
    // sends the actual mail
    this.contactService.sendContact(this.contactForm.value)

  }
}
