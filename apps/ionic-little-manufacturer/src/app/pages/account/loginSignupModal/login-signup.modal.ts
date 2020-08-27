import {Component, OnInit, ErrorHandler} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '@nx-little-manufacturer/core/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '@nx-little-manufacturer/utils';
@Component({
    templateUrl: 'login-signup.modal.html',
    styleUrls: ['login-signup.modal.scss'],
    selector: 'app-login-singup-modal'
})
export class LoginSignupModal implements OnInit {

    loginOrSignup: boolean; // true for login and false for sing up
    verificationMailWasSent: boolean; 
    showLoginMessages: boolean;
    showSignupMessages: boolean;
    errorMessageLogin: string;
    errorMessageSignup: string;
    signupForm: FormGroup;
    loginForm: FormGroup;

    constructor(private modalController: ModalController,
        public authService: AuthenticationService,
        public router: Router,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
      this.errorMessageLogin = "";
      this.errorMessageSignup = "";
      this.showLoginMessages = false;
      this.showSignupMessages = false;
      this.verificationMailWasSent = false;
      this.loginOrSignup = true;

      this.loginForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'password': new FormControl(null, [Validators.required]) 
      });
      this.signupForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, {
          validator: MustMatch('password', 'confirmPassword')
      });

      this.authService.authProviderSubject.subscribe((value) => {
          if (value == true) {
            console.log(value);
            this.dismiss();
          } else {

          }
      })
    }

    async dismiss() {
        this.verificationMailWasSent = false;
        await this.modalController.dismiss();
    }
    
    switchToLogin() {
        if (!this.loginOrSignup) { 
            this.loginOrSignup = !this.loginOrSignup;
        }
    }

    switchToSignup() {
        if (this.loginOrSignup) { 
            this.loginOrSignup = !this.loginOrSignup;
        }
    }

    signUp(){
      this.showSignupMessages = false;
      if (this.signupForm.valid) {
        this.authService.RegisterUser(this.signupForm.value.email, this.signupForm.value.password)
        .then((res) => {
          // Do something here
          console.log('res: ' + res);
          this.authService.SendVerificationMail()
          this.verificationMailWasSent = true;
        }).catch((error) => {
          console.log(error);
          this.showSignupMessages = true;
          switch (error.code) {
            case "auth/email-already-in-use": {
              this.errorMessageSignup = 'Aceasta adresa de email este asociata cu un cont existent.';
              break;
            }
            case "auth/network-request-failed": {
              this.errorMessageSignup = 'Eroare de conexiune, verifica daca esti conectat la internet.';
              break;
            }
            default: {
              this.errorMessageSignup = 'Ceva a mers gresit, incearca dinou.';
              break;
            }
          }
        })
      } else {
        this.showSignupMessages = true;
      }
      }

    logIn() {
      this.showLoginMessages = false; 
      if (this.loginForm.valid) {
        console.log(this.loginForm.value);
        this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
          .then((res) => {
            if(this.authService.isEmailVerified) {
              this.dismiss();         
            } else {
              this.showLoginMessages = true;
              this.errorMessageLogin = 'Contul nu este activat.';
              return false;
            }
          }).catch((error) => {
            if (error.code == "auth/wrong-password" || error.code == "auth/user-not-found") {
              this.showLoginMessages = true;
              this.errorMessageLogin = 'Datele introduse sunt incorecte.';
            }
          })
      } else {
        this.showLoginMessages = true;
      }
    }

    onInput() {
      this.showLoginMessages = false;
      this.showSignupMessages = false;
    }

    get regform() { return this.signupForm.controls; }
}