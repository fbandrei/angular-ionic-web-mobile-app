import { Component } from '@angular/core';
import { BaseComponent, AuthenticationService } from '@nx-little-manufacturer/core';

@Component({
  selector: 'tab-page',
  templateUrl: 'tab.component.html',
})
export class TabComponent extends BaseComponent {

  constructor(public authService: AuthenticationService) {super();}
}
