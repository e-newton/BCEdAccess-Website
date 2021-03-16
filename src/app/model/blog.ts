export class Blog {
  id: string|number;
  title: string;
  author: string;
  body: string;
  views: number;
  date: Date;
  featured: boolean;
  draft: boolean;
  coverImage: string;

  constructor(id: string, title: string, author: string, body: string, views: number,
              draft: boolean, date?: Date, featured?: boolean, coverImage?: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.body = body;
    this.views = views;
    this.draft = draft;
    this.coverImage = coverImage;
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
