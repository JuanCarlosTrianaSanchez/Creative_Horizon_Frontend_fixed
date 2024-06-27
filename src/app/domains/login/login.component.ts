
  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService } from '../../services/auth.service';
  import { HeaderComponent } from '../header/header.component';
  import { FooterComponent } from '../footer/footer.component';
  
  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    loginForm: FormGroup;
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  
    onSubmit(): void {
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe(
          () => {
            this.router.navigate(['/dashboard']);
          },
          (err) => {
            console.error(err);
          }
        );
      }
    }
  }
  