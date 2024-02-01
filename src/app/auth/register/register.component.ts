import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = ''; 
  passwordsDoNotMatch = false;
  fieldsAreEmpty = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Verifica si los campos obligatorios están vacíos
    if (this.username.trim() === '' || this.password.trim() === '' || this.confirmPassword.trim() === '') {
      // Al menos uno de los campos obligatorios está vacío
      this.fieldsAreEmpty = true;
      return;
    }

    // Verifica si las contraseñas coinciden
    if (this.password === this.confirmPassword) {
      // Las contraseñas coinciden, puedes proceder con el registro
      this.authService.register(this.username, this.password).subscribe({
        next: (response) => {
          // Registro exitoso, redirige al inicio de sesión o realiza alguna acción
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // Manejar errores de registro
        }
      });
    } else {
      // Las contraseñas no coinciden
      this.passwordsDoNotMatch = true;
    }
  }
}
