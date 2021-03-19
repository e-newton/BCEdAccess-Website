import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import {Event} from '../../model/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[];
  constructor(eventService: EventService) {
    eventService.getAllEvents().then((res) => {
      this.events = res;
    });
  }

  ngOnInit(): void {
  }

}
