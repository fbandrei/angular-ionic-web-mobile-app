import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { User } from "../../models/user.interface";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;
  provider: string;

  authProviderSubject = new Subject<string | boolean>();

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    private firebaseDynamicLinks: FirebaseDynamicLinks 
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

    // Handle the logic here after opening the app with the Dynamic link
    this.firebaseDynamicLinks.onDynamicLink()
    .subscribe((res: any) => console.log(res), (error:any) => console.log(error));
  }

  // Login in with email/password
  signIn(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  registerUser(email: string, password: string) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  async sendVerificationMail() {
    await this.ngFireAuth.onAuthStateChanged((user) => {
      user.sendEmailVerification();
    });
  }

  // Recover password
  async passwordRecover(passwordResetEmail: string) {
    try {
      await this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email has been sent, please check your inbox.');
    } catch (error) {
      window.alert(error);
    } 
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && (user.emailVerified !== false || this.provider == 'facebook.com' || this.provider == 'google.com')) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.authLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Auth providers
  async authLogin(provider: firebase.auth.AuthProvider) {
    try {
      const result = await this.ngFireAuth.signInWithPopup(provider);
      console.log(result);
      this.authProviderSubject.next(true);
      this.setUserData(result.user);
      this.provider = result.additionalUserInfo.providerId;
    } catch (error) {
      this.authProviderSubject.next(error.code);
    }
  }

  // Store user in localStorage
  setUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign-out 
  async signOut() {
    await this.ngFireAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['tabs/account']);
  }

  resetPasswordInit(email: string) {
    return this.ngFireAuth.sendPasswordResetEmail(email);
  }

}