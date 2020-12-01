import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import auth from 'firebase';
import {Observable, of} from 'rxjs';
import firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import UserCredential = firebase.auth.UserCredential;
import {switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(public afAuth: AngularFireAuth, public router: Router, public afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user){
          return this.afs.collection('users').doc(`${user.uid}`).valueChanges();
        } else{
          return of(null);
        }
      })
    );
  }

  async googleSignIn(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    const creds = await this.afAuth.signInWithPopup(provider);
    console.log('creds', creds);
    return creds;

  }


  async signout(): Promise<any> {
    await this.afAuth.signOut();
  }

}
