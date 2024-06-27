
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router'; // Importa Router
import { AuthService } from '../../services/auth.service'; // Importa AuthService

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { // Agrega AuthService y Router al constructor
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      barrio: ['', [Validators.required]],
      ciudad: ['', [Validators.required]], // Cambié de 'city' a 'ciudad' para alinear con el backend
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
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
        },
        error => {
          console.error('Error en el registro', error);
        }
      );
    }
  }
}

