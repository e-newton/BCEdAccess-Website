export class Blog {
  id: number;
  title: string;
  author: string;
  body: string;
  views: number;
  date: Date;

  constructor(id: number, title: string, author: string, body: string, views: number, date?: Date) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.body = body;
    this.views = views;
    if (date){
      this.date = date;
    } else{
      this.date = new Date();
    }

  }


  clearBody(): void{
    this.body = '';
  }



}
