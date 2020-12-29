export class Blog {
  id: number;
  title: string;
  author: string;
  body: string;
  views: number;
  date: Date;
  featured: boolean;
  draft: boolean;

  constructor(id: number, title: string, author: string, body: string, views: number, draft: boolean, date?: Date, featured?: boolean) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.body = body;
    this.views = views;
    this.draft = draft;
    if (date){
      this.date = date;
    } else{
      this.date = new Date();
    }
    this.featured = false;
    if (featured){
      this.featured = featured;
    }
  }


  clearBody(): void{
    this.body = '';
  }



}
