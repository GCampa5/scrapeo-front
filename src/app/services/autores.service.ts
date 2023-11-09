import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AutorService {
    private apiBaseUrl = 'http://localhost:8000/ScrapeoApp/autores';

    constructor(private http: HttpClient) { }

    obtenerAutoresUnicos(): Observable<string[]> {
        const url = 'http://localhost:8000/ScrapeoApp/autores';
        return this.http.get<string[]>(url);
    }
}
