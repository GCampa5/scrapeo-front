export class VideoInfo {
    video_id: string;
    video_title: string;
    channel_title: string;
    published_at: string;
    description: string;
    link: string;
    comentarios?: string[]

    constructor(id: string, titulo: string, autor: string, fecha: string, description: string, link: string) {
        this.video_id = id;
        this.video_title = titulo;
        this.channel_title = autor;
        this.published_at = fecha;
        this.description = description;
        this.link = link;
    }
}