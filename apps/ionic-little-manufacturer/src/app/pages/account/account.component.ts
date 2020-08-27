import { Component } from '@angular/core';
import { BaseComponent, AuthenticationService } from '@nx-little-manufacturer/core';
import { LoginSignupModal } from './loginSignupModal/login-signup.modal';
import {ModalController} from '@ionic/angular';
import { SettingsModal } from './settingsModal/settings.modal';

@Component({
  selector: 'page-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.scss'],
})
export class AccountComponent extends BaseComponent {

  constructor(private modalController: ModalController,
    public authService: AuthenticationService) {
    super();
  }

  async openSignInUpModal() {
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: LoginSignupModal,
          componentProps: {}
    });
     
    modal.onDidDismiss().then();
    
    await modal.present();
  }

  async openSettingsModal() {
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: SettingsModal,
          componentProps: {}
    });
     
    modal.onDidDismiss().then();
    
    await modal.present();
  }
}
