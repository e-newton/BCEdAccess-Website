export class Blog {
  id: number;
  title: string;
  author: string;
  body: string;

  constructor(id: number, title: string, author: string, body: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.body = body;
  }

  clearBody(): void{
    this.body = '';
  }



}
