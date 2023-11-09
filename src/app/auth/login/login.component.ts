import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        // Inicio de sesión exitoso, redirige al usuario a /home
        this.loginFailed = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Inicio de sesión fallido
        this.loginFailed = true;
      }
    });
  }
}