import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Event} from '../../model/event';
import {SeoService} from '../../services/seo.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  id = '';
  event: Event;

  constructor(eventService: EventService, activeRouter: ActivatedRoute, router: Router, seo: SeoService) {
    this.id = activeRouter.snapshot.paramMap.get('id');
    if (!this.id) {
      void router.navigate(['/']);
    }
    eventService.getEvent(this.id).then(event => {
      this.event = event;
      seo.generateTags({
        title: 'BCEdAccess - ' + event.title,
        description: event.description,
        image: event.coverImage,
        slug: router.url
      });
    });
  }

  ngOnInit(): void {
  }

}
