import { AutorService } from './../services/autores.service';
import { FiltroService } from './../services/tag.service';
import { Component } from '@angular/core';
import { Tag } from '../models/tag';
import { Router } from '@angular/router';
import { FiltroSharedService } from '../services/filtro-shared';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  tags: Tag[] = [];
  filtros: any = {};
  autores: string[] = [];

  getTags() {
    this.filtroService.getTags().subscribe(dato => {
      this.tags = dato;
    });
  }

  constructor(
    private filtroService: FiltroService,
    private filtroSharedService: FiltroSharedService,
    private router: Router,
    private autorService: AutorService
  ) { }

  ngOnInit(): void {
    this.getTags();
    this.obtenerAutores();
  }

  buscarNoticias() {
    this.filtroSharedService.setFiltros(this.filtros);
    this.router.navigate(['/noticia']);
  }

  obtenerAutores(): void {
    this.autorService.obtenerAutoresUnicos().subscribe((data) => {
      this.autores = data;
    });
  }
}
