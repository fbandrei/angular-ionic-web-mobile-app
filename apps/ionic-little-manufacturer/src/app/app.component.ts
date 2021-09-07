import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar as NgxStatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@nx-little-manufacturer/core';

@Component({
  selector: 'nx-little-manufacturer-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: NgxStatusBar,
    public translate: TranslateService,
    private storageService: StorageService
  ) {
    this.initializeApp();
    this.translate.addLangs(['en', 'ro']);
    this.storageService.getString("language").then((lang) => {
      this.translate.setDefaultLang(lang ? lang.value : 'en');
      this.translate.use(lang ? lang.value : 'en');
    });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        StatusBar.setStyle({
          style: StatusBarStyle.Dark,
        });
      } else {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });
  }
}
