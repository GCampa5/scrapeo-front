import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiBaseUrl = 'http://localhost:8000/ScrapeoApp/';

  constructor(private http: HttpClient) { }

  ejecutarScriptYoutube(data: any) {
    const scrapUrl = this.apiBaseUrl + 'buscar_videos_api/';
    return this.http.post(scrapUrl, data);
  }

  obtenerInfoVideos(data: any) {
    const scrapUrl = this.apiBaseUrl + 'obtener_info_videos_api/';
    return this.http.post(scrapUrl, data);
  }

  obtenerComentariosVideos(data: any){
    const scrapUrl = this.apiBaseUrl + 'obtener_comentarios_api/';
    return this.http.post(scrapUrl, data);
  }

  obtenerTranscripción(data: any){
    const scrapUrl = this.apiBaseUrl + 'obtener_transcripcion_api/';
    return this.http.post(scrapUrl, data);
  }
}