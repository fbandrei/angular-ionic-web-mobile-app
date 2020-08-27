import {Component, OnInit,} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@nx-little-manufacturer/core';
@Component({
    templateUrl: 'settings.modal.html',
    styleUrls: ['settings.modal.scss'],
    selector: 'app-settings-modal'
})
export class SettingsModal implements OnInit {

    constructor(
      private modalController: ModalController,
      public translate: TranslateService,
      private storageService: StorageService
    ) {}

    switchLang(lang: string) {
      this.translate.use(lang);
      this.storageService.setString("language", lang);
    }

    ngOnInit() {
    }

    async dismiss() {
        await this.modalController.dismiss();
    }
}