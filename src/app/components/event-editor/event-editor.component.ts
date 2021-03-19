import {ApplicationRef, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FirebaseStorageImageCacheService} from '../../services/firebase-storage-image-cache.service';
import {ScheduleItem} from '../../model/schedule-item';
import {Event} from '../../model/event';
import {EventService} from '../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {
  previousID = '';
  titleFC = new FormControl('');
  descriptionFC = new FormControl('');
  linkFC = new FormControl('');
  dateFC: FormGroup;
  scheduleFC: FormGroup[];
  id = '';
  coverImageURL = '';
  imageError = '';
  postError = '';

  constructor(private zone: NgZone, private fsic: FirebaseStorageImageCacheService, private eventService: EventService,
              private router: Router, private activatedRouter: ActivatedRoute) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.dateFC = new FormGroup({
      start: new FormControl(today),
      end: new FormControl(today)
    });
    this.scheduleFC = [];
    if (this.activatedRouter.snapshot.paramMap.get('id')){
      this.imageError = 'Loading...';
      this.previousID = this.activatedRouter.snapshot.paramMap.get('id');
      this.eventService.getEvent(this.previousID).then((event) => {
        this.imageError = '';
        this.titleFC.setValue(event.title);
        this.descriptionFC.setValue(event.description);
        this.linkFC.setValue(event.ticketLink);
        if (event.coverImage){
          this.imageError = 'Cover Image Already Uploaded';
          this.coverImageURL = event.coverImage;
        }
        this.dateFC.get('start').setValue(event.startDate.toDate());
        this.dateFC.get('end').setValue(event.endDate.toDate());
        for (const [d, value] of Object.entries(event.schedule)){
          if (d in event.schedule){
            this.scheduleFC.push(new FormGroup({
              date: new FormControl(event.schedule[d].date.toDate()),
              time: new FormControl(event.schedule[d].time),
              description: new FormControl(event.schedule[d].description),
            }));
          }
        }
        console.log(event);
      }).catch((err) => {
        void this.router.navigate(['/']);
      });
    }

  }

  ngOnInit(): void {
  }

  change(event: any): void {
    console.log(this.scheduleFC);
  }
  addScheduleItem(): void{
    this.scheduleFC.push(new FormGroup({
      date: new FormControl(this.dateFC.get('start').value),
      time: new FormControl(''),
      description: new FormControl(''),
    }));
    this.zone.run(() => {});
    console.log(this.getScheduleItemsObject());
  }

  getID(): string {
    let value = this.titleFC.value.toString().toLowerCase().trim().replace(' ', '-');
    while (value.includes(' ')){
      value = value.toString().toLowerCase().trim().replace(' ', '-');
      console.log('1', value);
    }
    while (value.match(/[^a-z^A-Z^0-9_-]+/gi)){
      value = value.replace(/[^a-z^A-Z^0-9_-]+/gi, '');
      console.log('2', value);
    }
    return value;


  }

  getEventObject(): Event{
    return new Event(this.getID(), this.titleFC.value, this.dateFC.get('start').value, this.dateFC.get('end').value,
                    this.descriptionFC.value, this.linkFC.value, this.getScheduleItemsObject(), this.coverImageURL);
  }

  getScheduleItemsObject(): any {
    const rv = {};
    this.scheduleFC.forEach((fg, index) => {
      rv[String(index)] = {date: fg.get('date').value, time: fg.get('time').value, description: fg.get('description').value};
    });
    return rv;
  }

  uploadCoverImage($event: InputEvent): void {
    console.log('upload attempt');
    const files: FileList = ($event.target as HTMLInputElement & EventTarget).files;
    if (!files){
      this.imageError = 'No File Found';
      return;
    }
    const file: File = files[0];
    if (!this.getID()){
      this.imageError = 'Please enter an event title first.';
      return;
    }
    this.fsic.uploadEventCoverImage(this.getID(), file).then((url) => {
      console.log('file uploaded');
      this.imageError = '';
      this.coverImageURL = url;
    });

  }

  publish(): Promise<void>{
    console.log('publishing...');
    if (!this.getID()){
      this.postError = `Title or ID missing. \n ID: ${this.getID()}`;
      return;
    }
    console.log('valid id');
    if (this.previousID && this.previousID !== this.getID()){
      console.log('starting delete');
      this.eventService.deleteEvent(this.previousID).then(() => {
        this.eventService.uploadEvent(this.getEventObject()).then(() => {
          // DO something
          console.log('deleted then uploaded');
          void this.router.navigate(['/', 'events', this.getID()]);
        });
      });
    } else{
      this.eventService.uploadEvent(this.getEventObject()).then(() => {
        console.log('uploaded');
        void this.router.navigate(['/', 'events', this.getID()]);
        // Navigate away or something idk
      });
    }
  }

}
