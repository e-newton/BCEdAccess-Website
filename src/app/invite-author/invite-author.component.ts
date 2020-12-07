import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-invite-author',
  templateUrl: './invite-author.component.html',
  styleUrls: ['./invite-author.component.css']
})
export class InviteAuthorComponent implements OnInit {

  submitting = false;

  formGroup = new FormGroup({
    email: new FormControl('')
  });

  constructor(public afs: AngularFirestore) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void>{
    this.submitting = true;
    if (!this.formGroup.value.email){
      this.submitting = false;
      return;
    }
    const user = await this.afs.collection('users').doc(this.formGroup.value.email).get().toPromise();

    if (user.exists){
      this.submitting = false;
      return;
    }

    else{
      await this.afs.collection('author-invites').doc(this.formGroup.value.email).set({name: null});
      this.submitting = false;
      return;
    }


  }

}
