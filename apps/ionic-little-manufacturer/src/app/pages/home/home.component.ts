import { Component } from '@angular/core';
import { BaseComponent, AuthenticationService } from '@nx-little-manufacturer/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent extends BaseComponent {

  constructor(public authService: AuthenticationService) {super();}
}
