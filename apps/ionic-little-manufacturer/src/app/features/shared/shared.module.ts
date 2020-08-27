import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@nx-little-manufacturer/ionic';

@NgModule({
  imports: [UIModule],
  exports: [UIModule],
})
export class SharedModule {}
