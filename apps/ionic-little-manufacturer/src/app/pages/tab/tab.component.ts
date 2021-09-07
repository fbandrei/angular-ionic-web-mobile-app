import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BaseComponent, AuthenticationService } from '@nx-little-manufacturer/core';
import { SellModal } from '../sell/sellModal/sell.modal';

@Component({
  selector: 'tab-page',
  templateUrl: 'tab.component.html',
})
export class TabComponent extends BaseComponent {

  constructor(public authService: AuthenticationService,
    private modalController: ModalController) {
      super();
  }

  async openSellModal() {
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: SellModal,
          componentProps: {}
    });
     
    modal.onDidDismiss().then(() => {
      
    });
    await modal.present();
  }
}
