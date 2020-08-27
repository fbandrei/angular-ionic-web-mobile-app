import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../../features/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginSignupModal } from './loginSignupModal/login-signup.modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsModal } from './settingsModal/settings.modal';

@NgModule({
  imports: [SharedModule, AccountRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [AccountComponent, LoginSignupModal, SettingsModal],
  entryComponents: [LoginSignupModal, SettingsModal],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {}
