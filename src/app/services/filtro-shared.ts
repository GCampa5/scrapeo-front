import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltroSharedService {
  private filtros: any = {};

  setFiltros(nuevosFiltros: any) {
    this.filtros = nuevosFiltros;
    if(this.filtros.palabras_clave){
    this.filtros.palabras_clave = this.filtros.palabras_clave.split(',').map((keyword: string) => keyword.trim());
    }
    console.log("Filtros set",this.filtros);
  }

  getFiltros() {
    return this.filtros;
  }
}
