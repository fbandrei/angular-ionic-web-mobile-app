import { NgModule } from '@angular/core';

// libs
import { NxLittleManufacturerIonicCoreModule } from '@nx-little-manufacturer/ionic';
import { AuthModule } from '@nx-little-manufacturer/core';

@NgModule({
  imports: [NxLittleManufacturerIonicCoreModule, AuthModule],
  exports: [AuthModule]
})
export class CoreModule {}
