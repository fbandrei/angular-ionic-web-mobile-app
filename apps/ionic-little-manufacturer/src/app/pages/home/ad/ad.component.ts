import { Component } from '@angular/core';
import { BaseComponent, AuthenticationService } from '@nx-little-manufacturer/core';

@Component({
  selector: 'page-ad',
  template: `
    <ion-grid> 
        <ion-row> 
            <ion-col> 
                <ion-card>
                    <img src="../../../../assets/imgs/salcam.png" />
                    <ion-card-header>
                    <ion-card-subtitle>Miere de salcam</ion-card-subtitle>
                    <ion-card-title>30 RON</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Miere naturala de salcam direct de la producator.
                    </ion-card-content>
                </ion-card>

                <ion-card>
                    <img src="../../../../assets/imgs/farming.png" />
                    <ion-card-header>
                    <ion-card-subtitle>Servicii de agricultura</ion-card-subtitle>
                    <ion-card-title>100 RON / ZI</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>
    </ion-grid>
  `,
})
export class AdComponent extends BaseComponent {

    adDetails: AdDetails[] = [
        {title: 'Miere de salcam', price: 30}
    ]
    constructor(public authService: AuthenticationService) {super();}
}

interface AdDetails {
    photos?: any[];
    title?: string;
    price?: number;
    description?: string;
}
