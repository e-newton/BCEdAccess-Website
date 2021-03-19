import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Event} from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private firestore: AngularFirestore) {
  }

  async uploadEvent(event: Event): Promise<void>{
    await this.firestore.doc(`events/${event.id}`).set({
      id: event.id,
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      description: event.description,
      ticketLink: event.ticketLink,
      schedule: event.schedule,
      coverImage: event.coverImage
    });
  }
  async deleteEvent(id: string): Promise<void>{
    console.log('deleting');
    await this.firestore.doc(`events/${id}`).delete();
    console.log('finished deleting');
  }
  async getEvent(id: string): Promise<Event>{
    const snap =  await this.firestore.doc(`events/${id}`).get().toPromise();
    return snap.data() as Event;
  }
  async getAllEvents(): Promise<Event[]>{
    const rv = [];
    const snap = await this.firestore.collection('events').get().toPromise();
    for (const d of snap.docs){
      rv.push(await d.data());
    }
    return rv;
  }
}
