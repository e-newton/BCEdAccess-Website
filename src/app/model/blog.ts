export class Blog {
  title: string;
  author: string;
  body: string;

  constructor(title: string, author: string, body: string) {
    this.title = title;
    this.author = author;
    this.body = body;
  }

  clearBody(): void{
    this.body = '';
  }



}
