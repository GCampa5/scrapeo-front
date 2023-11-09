export class Noticia {
    Id: number;
    Title: string;
    Tag: string;
    Author: string;
    Date: string;
    Link: string;
    Content: string;

    constructor(id: number, titulo: string, tag: string, autor: string, fecha: string, link: string, contenido: string){
        this.Id = id;
        this.Title = titulo;
        this.Tag = tag;
        this.Author = autor;
        this.Date = fecha;
        this.Link = link;
        this.Content = contenido;
    }
  }

  