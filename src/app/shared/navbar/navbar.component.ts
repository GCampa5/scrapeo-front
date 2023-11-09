import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  username: string = "";

  constructor(public authService: AuthService){
    this.username = localStorage.getItem('username') ?? ''; 
  }

  logout() {
    // Llama al método de cierre de sesión en el servicio de autenticación
    this.authService.logout()
  }
}




