import { Component } from '@angular/core';
import { NoticiaService } from '../services/noticia.service';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss']
})
export class ScrapComponent {
  faSpinner = faSpinner;
  filtros: any = {};
  fechaInvalida: boolean = false;
  categorias: string[] = ['ARQUEOLOGIA', 'EXPOLIOS', 'CULTURA'];
  fechaActual: Date = new Date();
  habilitarBoton: boolean = false;

  private apiBaseUrl = 'http://localhost:8000/ScrapeoApp/';
  showProgressBar: boolean = false;

  constructor(
    private noticiaService: NoticiaService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  
  ejecutarScript() {
    this.showProgressBar = true;  
    const categoria = this.filtros.categoria.toLowerCase();

    console.log('Categoría:', categoria);
    console.log('Año límite:', this.filtros.fechaLimite);
    console.log('URL de la solicitud:', this.apiBaseUrl + 'scraping_elpais/');
    
    const data = {
        categoria: categoria,
        fechaLimite: this.filtros.fechaLimite
    };

    this.noticiaService.ejecutarScriptElPais(data).subscribe(
      (response) => {
        this.showProgressBar = false;  // Oculta la barra de progreso al terminar
        console.log(response);
        this.router.navigate(['/filtro_noticia']);
      },
      (error) => {
        this.showProgressBar = false
        console.error(error);
        // Manejar errores aquí
      }
    );
  }

  validarFecha() {
    const fechaLimite = new Date(this.filtros.fechaLimite);
    const fechaMinima = new Date('2010-01-01');
    
    if (fechaLimite < fechaMinima || fechaLimite > this.fechaActual) {
      this.fechaInvalida = true;
    } else {
      this.fechaInvalida = false;
    }
  
    // Verifica si el botón debe estar habilitado o deshabilitado
    this.habilitarBoton = !this.fechaInvalida;
  }
}
