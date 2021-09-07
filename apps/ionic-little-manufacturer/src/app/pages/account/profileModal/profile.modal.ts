import {Component, OnInit,} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Profile } from '../account.component';
import { AccountService } from '../account.service';
@Component({
    templateUrl: 'profile.modal.html',
    styleUrls: ['profile.modal.scss'],
    selector: 'app-profile-modal'
})
export class ProfileModal implements OnInit {

    name: string;

    constructor(
      private modalController: ModalController,
      public translate: TranslateService,
      private accountService: AccountService
    ) {}

    ngOnInit(): void {
    }

    async dismiss() {
        await this.modalController.dismiss();
    }

    saveProfileData(): void {
      const profile: Profile = { name : this.name};
      this.accountService.saveProfileData(profile).then(res => {
        console.log(res);
      });
    }
}