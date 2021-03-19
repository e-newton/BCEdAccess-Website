export class ScheduleItem {
  date: Date & {seconds: number, toDate(): Date};
  time: string;
  description: string;

  constructor(date: Date & {seconds: number, toDate(): Date}, time: string, description: string) {
    this.date = date;
    this.time = time;
    this.description = description;
  }
}
