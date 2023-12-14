import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { VideoSharedService } from '../services/video.shared';
import { VideoService } from '../services/video.service';
import { VideoInfo } from '../models/video_info';

@Component({
  selector: 'app-info-videos',
  templateUrl: './info-videos.component.html',
  styleUrls: ['./info-videos.component.scss']
})
export class InfoVideosComponent {

  @ViewChild('transcriptionModal') transcriptionModal!: ElementRef;
  @ViewChild('comentariosModal') comentariosModal!: ElementRef;

  faError = faExclamationCircle;
  faSearch =  faSearch;
  maxResults: number = 5;
  transcripcionContenido: string = '';
  selectedVideos: string[] = [];
  videos: VideoInfo[] = [];
  showComentarios: boolean = false;
  activeVideoId: string | null = null;
  activeComments: string[] = [];

  constructor(
    private videoService: VideoService,
    private router: Router,
    private videoShared: VideoSharedService
  ) { }

  ngOnInit(): void {
    this.getInfoVideos();
  }

  openTranscriptionModal(videoId: string): void {
    const data = {
      video_id: videoId
    };
    this.videoService.obtenerTranscripción(data).subscribe(
      (response: any) => {
        if (response.videos_info == null) {
          this.transcripcionContenido = "No se ha podido obtener la transcripción para el vídeo seleccionado";
        }
        else {
          this.transcripcionContenido = response.videos_info;
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.transcripcionContenido = 'Contenido de la transcripción';

    if (this.transcriptionModal) {
      this.transcriptionModal.nativeElement.classList.add('show');
      this.transcriptionModal.nativeElement.style.display = 'block';
    }
  }

  closeTranscriptionModal(): void {
    this.transcriptionModal.nativeElement.classList.remove('show');
    this.transcriptionModal.nativeElement.style.display = 'none';
  }

  getInfoVideos() {
    this.selectedVideos = this.videoShared.getSelectedVideos();
    const data = {
      video_ids: this.selectedVideos
    };

    this.videoService.obtenerInfoVideos(data).subscribe(
      (response: any) => {
        this.videos = response.videos_info.map((video: any) => {
          const videoId = video.video_id;

          return new VideoInfo(
            videoId,
            video.video_title,
            video.channel_title,
            video.published_at,
            video.description,
            video.video_url
          );
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openComentariosModal(videoId: string): void {
    this.activeVideoId = videoId;
    if (this.comentariosModal) {
      this.comentariosModal.nativeElement.classList.add('show');
      this.comentariosModal.nativeElement.style.display = 'block';
    }
  }

  closeComentariosModal(): void {
    if (this.comentariosModal) {
      this.comentariosModal.nativeElement.classList.remove('show');
      this.comentariosModal.nativeElement.style.display = 'none';
      this.showComentarios = false;
      this.activeComments = [];
    }
  }

  buscarComentarios(): void {
    console.log(this.activeVideoId);
    const data = {
      video_id: this.activeVideoId,
      max_results: this.maxResults
    }
    this.videoService.obtenerComentariosVideos(data).subscribe(
      (response: any) => {
        const videoIndex = this.videos.findIndex((video) => video.video_id === this.activeVideoId);
          if (videoIndex !== -1) {
            this.videos[videoIndex].comentarios = response.comentarios;
            this.activeComments = response.comentarios;
            this.showComentarios = true;
          }
      },
      (error: any) => {
        console.error('Error al obtener comentarios', error);
      }
    );
  }
}

