import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PipesModule } from '@nx-little-manufacturer/utils';

import { SharedModule } from '../../features/shared/shared.module';
import { SellModal } from '../sell/sellModal/sell.modal';
import { TabRoutingModule } from './tab-routing.module';
import { TabComponent } from './tab.component';

@NgModule({
  imports: [SharedModule, TabRoutingModule, PipesModule],
  declarations: [TabComponent, SellModal],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabModule {}
