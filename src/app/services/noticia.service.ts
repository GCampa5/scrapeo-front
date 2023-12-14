import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiBaseUrl = 'http://localhost:8000/ScrapeoApp/';

  constructor(private http: HttpClient) { }

  ejecutarScriptElPais(data: any) {
    const scrapUrl = this.apiBaseUrl + 'scraping_elpais/';
    return this.http.post(scrapUrl, data);
  }

  buscarNoticias(filtros: any, page: number, user_id: string): Observable<any> {
    // Convierte los filtros en parámetros de consulta
    let params = new HttpParams();
    for (let key in filtros) {
      if (filtros[key]) {
        params = params.set(key, filtros[key]);
      }
    }

    params = params.set('page', page);
    if (user_id) {
      params = params.set('user_id', user_id);
    }

    return this.http.get('http://localhost:8000/ScrapeoApp/buscar_noticias/', { params: params });
  }
}