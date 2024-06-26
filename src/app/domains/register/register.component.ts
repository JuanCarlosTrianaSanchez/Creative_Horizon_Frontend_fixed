import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      barrio: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.matchingEmails('email', 'confirmEmail') });
  }

  matchingEmails(emailKey: string, confirmEmailKey: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      let email = group.controls[emailKey];
      let confirmEmail = group.controls[confirmEmailKey];
      if (email.value !== confirmEmail.value) {
        return {
          mismatchedEmails: true
        };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }
}
