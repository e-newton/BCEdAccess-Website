import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import auth from 'firebase';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import UserCredential = firebase.auth.UserCredential;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.user$ = this.afAuth.authState;
  }

  async googleSignIn(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await this.afAuth.signInWithPopup(provider);

  }


  async signout(): Promise<any> {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

}
