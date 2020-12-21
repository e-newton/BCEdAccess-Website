export class Blog {
  id: number;
  title: string;
  author: string;
  body: string;
  views: number;

  constructor(id: number, title: string, author: string, body: string, views: number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.body = body;
    this.views = views;
  }

  clearBody(): void{
    this.body = '';
  }



}
