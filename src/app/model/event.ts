export class Event {
  id: string;
  title: string;
  startDate: Date & {seconds: number, toDate(): Date};
  endDate: Date & {seconds: number, toDate(): Date};
  description: string;
  ticketLink: string;
  schedule: any;
  coverImage: string;


  constructor(id: string, title: string, startDate: Date & {seconds: number, toDate(): Date}, endDate: Date & {seconds: number, toDate(): Date},
              description: string, ticketLink: string, schedule: any, coverImage: string) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.ticketLink = ticketLink;
    this.schedule = schedule;
    this.coverImage = coverImage;
  }
}
