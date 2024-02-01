import { Component } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { VideoService } from '../services/video.service';
import { Router } from '@angular/router';
import { VideoSharedService } from '../services/video.shared';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buscar-videos',
  templateUrl: './buscar-videos.component.html',
  styleUrls: ['./buscar-videos.component.scss']
})
export class BuscarVideosComponent {
  faInfo = faInfo;
  faSpinner = faSpinner;
  query: string = "";
  valMax: boolean = false;
  max_results: number = 5; //valor por defecto
  showProgressBar: boolean = false;
  videos: any 
  showVideos: boolean = false;
  selectedVideos: string[] = [];
  videosNotFound: boolean = false;

  constructor(
    private videoService: VideoService,
    private videoShared: VideoSharedService
  ) { }

  buscar_videos() {
    this.selectedVideos = [];
    this.showProgressBar = true;
    const data = {
      //user_id: user_id,
      query: this.query,
      max_results: this.max_results
    };
    this.videoService.ejecutarScriptYoutube(data).subscribe(
      (response) => {
        this.showProgressBar = false;
        this.mostrarVideos(response);  // Llama a una función para mostrar los videos
      },
      (error) => {
        this.showProgressBar = false;  // Oculta la barra de progreso al terminar
        console.error(error);
        // Manejar errores aquí
      }
    );
  }

  selectVideo(videoId: string) {
    const index = this.selectedVideos.indexOf(videoId);
    if (index === -1) {
      this.selectedVideos.push(videoId);
      this.videoShared.setSelectedVideos(this.selectedVideos)
    } else {
      this.selectedVideos.splice(index, 1);
      this.videoShared.setSelectedVideos(this.selectedVideos)
    }
  }

  isSelected(videoId: string): boolean {
    return this.selectedVideos.includes(videoId);
  }

  mostrarVideos(response: any) {
    this.videos = response.videos;
    this.showVideos = true;
    this.videosNotFound = this.videos.length === 0;
  }


  validarMaximo() {
    const button = document.getElementById('search-button');
    if (button != null) {
      if (this.max_results >= 51) {
        this.valMax = true;
        button.setAttribute('disabled', 'disabled');
      }
      else {
        this.valMax = false;
        button.removeAttribute('disabled');
      }
    }
  }

}
