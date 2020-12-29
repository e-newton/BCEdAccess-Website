import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.css']
})
export class AcceptInviteComponent implements OnInit {

  accepted = false;
  email = '';
  formGroup = new FormGroup({
    name: new FormControl('')
  });
  submitting = false;
  success = false;

  constructor(public route: ActivatedRoute, public afs: AngularFirestore, public router: Router) {
    this.route.queryParams.subscribe(params => {
      if (!params.email){
        this.router.navigate(['/']);
        return;
      }
      const email: string = params.email;
      this.afs.collection('author-invites').doc(`${email}`).get().subscribe(user => {
        if (!user.exists){
          // reject
          this.router.navigate(['/']);
        }
        else{
          // accept
          this.email = email;
          this.accepted = true;
        }
      });
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitting = true;
    this.afs.collection('users').doc(`${this.email}`).set({name: this.formGroup.value.name}).then(() => {
      this.afs.collection('author-invites').doc(`${this.email}`).delete().then(async () => {
        this.submitting = false;
        this.success = true;
        await new Promise( resolve => setTimeout(resolve, 3000) );
        this.router.navigate(['/']);
      });
    });


  }
}
