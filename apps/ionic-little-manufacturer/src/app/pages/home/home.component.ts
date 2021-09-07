import { Component } from '@angular/core';
import { BaseComponent } from '@nx-little-manufacturer/core/base';
import { AuthenticationService } from '@nx-little-manufacturer/core/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent extends BaseComponent {

  constructor(public authService: AuthenticationService) {super();}
}
