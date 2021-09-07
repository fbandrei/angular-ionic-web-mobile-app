import { Component } from '@angular/core';
import { LoginSignupModal } from './loginSignupModal/login-signup.modal';
import { SettingsModal } from './settingsModal/settings.modal';
import { ProfileModal } from './profileModal/profile.modal';
import { ModalController } from '@ionic/angular';
import { BaseComponent } from '@nx-little-manufacturer/core/base';
import { AuthenticationService } from '@nx-little-manufacturer/core/services';

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
     
    modal.onDidDismiss().then(() => {
      
    });
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

  async openProfileModal() {
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: ProfileModal,
          componentProps: {}
    });
     
    modal.onDidDismiss().then();
    await modal.present();
  }
}

export interface Profile {
  isProducer?: boolean;
  name?: string;
  description?: string;
  location?: string;
}
