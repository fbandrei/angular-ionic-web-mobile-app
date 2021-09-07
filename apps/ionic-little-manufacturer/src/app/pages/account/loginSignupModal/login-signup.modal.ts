import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '@nx-little-manufacturer/core/services';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '@nx-little-manufacturer/utils';
import { TranslateService } from '@ngx-translate/core';
@Component({
    templateUrl: 'login-signup.modal.html',
    styleUrls: ['login-signup.modal.scss'],
    selector: 'app-login-singup-modal'
})
export class LoginSignupModal implements OnInit {

    loginOrSignup: boolean; // true for login and false for sign up
    verificationMailWasSent: boolean; 
    showLoginMessages: boolean;
    showSignupMessages: boolean;
    errorMessageLogin: string;
    errorMessageSignup: string;
    signupForm: FormGroup;
    loginForm: FormGroup;

    constructor(private modalController: ModalController,
        public authService: AuthenticationService,
        public translate: TranslateService,
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

      this.authService.authProviderSubject.subscribe((value: string | boolean) => {
          if (value === true) {
            this.dismiss();
          } else {
            switch (value) {
              case "auth/email-already-in-use": {
                if (this.loginOrSignup) { 
                  this.errorMessageLogin = 'auth/email-already-in-use';
                } else {
                  this.errorMessageSignup = 'auth/email-already-in-use';
                }
                break;
              }
              case "auth/network-request-failed": {
                if (this.loginOrSignup) { 
                  this.errorMessageLogin = 'auth/network-request-failed';
                } else {
                  this.errorMessageSignup = 'auth/network-request-failed';
                }
                break;
              }
              default: {
                if (this.loginOrSignup) { 
                  this.errorMessageLogin = 'auth/something-went-wrong';
                } else {
                  this.errorMessageSignup = 'auth/something-went-wrong';
                }
                break;
              }
            }
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
        this.authService.registerUser(this.signupForm.value.email, this.signupForm.value.password)
        .then((res) => {
          console.log('res: ' + res);
          this.authService.sendVerificationMail()
          this.verificationMailWasSent = true;
        }).catch((error) => {
          console.log(error);
          this.showSignupMessages = true;
          switch (error.code) {
            case "auth/email-already-in-use": {
              this.errorMessageSignup = 'auth/email-already-in-use';
              break;
            }
            case "auth/network-request-failed": {
              this.errorMessageSignup = 'auth/network-request-failed';
              break;
            }
            default: {
              this.errorMessageSignup = 'auth/something-went-wrong';
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
        this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password)
          .then((res) => {
            if(this.authService.isEmailVerified) {
              this.dismiss();         
            } else {
              this.showLoginMessages = true;
              this.errorMessageLogin = 'accountNotActive';
              return false;
            }
          }).catch((error) => {
            if (error.code == "auth/wrong-password" || error.code == "auth/user-not-found") {
              this.showLoginMessages = true;
              this.errorMessageLogin = 'auth/wrong-credentials';
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