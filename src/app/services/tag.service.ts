import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';


@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private apiBaseUrl = 'http://localhost:8000/ScrapeoApp/tag'; 

  constructor(private http: HttpClient) { }

  // Obtiene todas las categorias
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiBaseUrl);
  }

  // Obtiene una categoria por su ID
  getTag(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiBaseUrl}${id}`);
  }

}
