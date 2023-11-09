import { FiltroSharedService } from './../services/filtro-shared';
import { Component, OnInit } from '@angular/core';
import { Noticia } from '../models/noticia';
import { NoticiaService } from '../services/noticia.service';
import { Location } from '@angular/common';
import { faListAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-noticias',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})

export class NoticiaComponent implements OnInit {

  noticias: Noticia[] = [];
  currentPage: number = 1;
  totalPages: number = 100;
  totalNews: number | undefined;
  faList = faListAlt

  constructor(private noticiaService: NoticiaService, private filtroSharedService: FiltroSharedService, private location: Location) {}

  ngOnInit(): void {
    this.getNoticias();
  }

  getNoticias(): void {
    const filtros = this.filtroSharedService.getFiltros();
    this.noticiaService.buscarNoticias(filtros, this.currentPage).subscribe(response => {
      this.noticias = response.results;
      this.totalNews = response.count;
      this.totalPages = Math.ceil(response.count / 10);
    });
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.getNoticias();
    window.scrollTo(0, 0);
  }
}