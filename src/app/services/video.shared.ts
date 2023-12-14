import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VideoSharedService {

  private selectedVideos: string[] = [];

  getSelectedVideos(): string[] {
    return this.selectedVideos;
  }

  setSelectedVideos(selectedVideos: string[]){
    this.selectedVideos = [...selectedVideos];
    console.log(this.selectedVideos);
  }
}
