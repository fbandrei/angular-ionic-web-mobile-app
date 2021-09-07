import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../../features/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginSignupModal } from './loginSignupModal/login-signup.modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsModal } from './settingsModal/settings.modal';
import { ProfileModal } from './profileModal/profile.modal';
import { AccountService } from './account.service';

@NgModule({
  imports: [SharedModule, AccountRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [AccountComponent, LoginSignupModal, SettingsModal, ProfileModal],
  entryComponents: [LoginSignupModal, SettingsModal, ProfileModal],
  providers: [AccountService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {} 
