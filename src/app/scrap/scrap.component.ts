import { Component } from '@angular/core';
import { NoticiaService } from '../services/noticia.service';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss']
})
export class ScrapComponent {
  faSpinner = faSpinner;
  filtros: any = {};
  fechaInvalida: boolean = false;
  fechaInicioInvalida: boolean = false;
  errorFechaMayorFechaLimite: boolean = false;
  categorias: string[] = ['ARQUEOLOGIA', 'EXPOLIOS', 'CULTURA', 'HALLAZGO ARQUEOLOGICO'];
  fechaActual: Date = new Date();
  habilitarBoton: boolean = false;

  private apiBaseUrl = 'http://localhost:8000/ScrapeoApp/';
  showProgressBar: boolean = false;

  constructor(
    private noticiaService: NoticiaService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  ejecutarScript() {
    this.showProgressBar = true;
    const categoria = this.filtros.categoria.toLowerCase().replace(/\s+/g, '-');
    console.log(categoria);
    const user_id = this.authService.getUserId();

    const data = {
      user_id: user_id,
      categoria: categoria,
      fechaLimite: this.filtros.fechaLimite,
      fechaInicio: this.filtros.fechaInicio
    };

    this.noticiaService.ejecutarScriptElPais(data).subscribe(
      (response) => {
        this.showProgressBar = false;  // Oculta la barra de progreso al terminar
        console.log(response);
        alert("Script ejecutado correctamente");
        this.router.navigate(['/home']);
      },
      (error) => {
        this.showProgressBar = false
        console.error(error);
        // Manejar errores aquí
      }
    );
  }

  validarFecha() {
    const fechaInicio = new Date(this.filtros.fechaInicio);
    const fechaLimite = new Date(this.filtros.fechaLimite);
    const fechaMinima = new Date('2010-01-01');

    // Comprobación de la fecha límite
    if (fechaLimite < fechaMinima || fechaLimite > this.fechaActual) {
      this.fechaInvalida = true;
    } else {
      this.fechaInvalida = false;
    }

    // Comprobación de la fecha inicial
    if (fechaInicio < fechaMinima) {
      this.fechaInicioInvalida = true;
    } 
    else if (fechaInicio > fechaLimite || fechaInicio > this.fechaActual) {
      this.errorFechaMayorFechaLimite = true;
    }
    else {
      this.fechaInicioInvalida = false;
      this.errorFechaMayorFechaLimite = false;
    }

    // Verifica si el botón debe estar habilitado o deshabilitado
    this.habilitarBoton = !this.fechaInvalida && !this.fechaInicioInvalida &&!this.errorFechaMayorFechaLimite;
  }
}
