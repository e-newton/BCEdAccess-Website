import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(value: Timestamp, ...args: unknown[]): unknown {
    return value.toDate().toLocaleDateString();
  }

}
