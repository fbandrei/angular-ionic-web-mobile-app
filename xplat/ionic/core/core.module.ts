import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { throwIfAlreadyLoaded } from '@nx-little-manufacturer/utils';
import { NxLittleManufacturerCoreModule } from '@nx-little-manufacturer/web';

@NgModule({
  imports: [NxLittleManufacturerCoreModule, IonicModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
})
export class NxLittleManufacturerIonicCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NxLittleManufacturerIonicCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'NxLittleManufacturerIonicCoreModule');
  }
}
