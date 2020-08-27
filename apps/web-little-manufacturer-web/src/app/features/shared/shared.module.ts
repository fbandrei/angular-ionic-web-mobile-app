import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@nx-little-manufacturer/web';

@NgModule({
  imports: [UIModule],
  exports: [UIModule],
})
export class SharedModule {}
