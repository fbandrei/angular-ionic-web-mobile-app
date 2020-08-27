import { Component } from '@angular/core';

// xplat
import { AppBaseComponent } from '@nx-little-manufacturer/web';

@Component({
  selector: 'nx-little-manufacturer-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends AppBaseComponent {
  constructor() {
    super();
  }
}
