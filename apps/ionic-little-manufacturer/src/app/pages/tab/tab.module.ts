import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../../features/shared/shared.module';
import { TabRoutingModule } from './tab-routing.module';
import { TabComponent } from './tab.component';

@NgModule({
  imports: [SharedModule, TabRoutingModule],
  declarations: [TabComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabModule {}
