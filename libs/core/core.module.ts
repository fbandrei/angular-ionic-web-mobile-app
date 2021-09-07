import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
  Inject,
} from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';

// libs
import { TranslateService } from '@ngx-translate/core';
import { SafePipe, throwIfAlreadyLoaded } from '@nx-little-manufacturer/utils';

// app
import { environment } from './environments/environment';
import { LogService } from './services/log.service';
import { PlatformLanguageToken } from './services/tokens';
import { WindowService } from './services/window.service';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { FirebaseModule } from './services/firebase/firebase.module';

/**
 * DEBUGGING
 */
LogService.DEBUG.LEVEL_4 = !environment.production;

@NgModule({
  imports: [CommonModule, FirebaseModule],
  exports: [FirebaseModule]
})
export class CoreModule {
  // configuredProviders: *required to configure WindowService and others per platform
  static forRoot(
    configuredProviders: Array<any>
  ): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        LogService,
        WindowService,
        FirebaseDynamicLinks,
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
        ...configuredProviders,
      ],
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    @Inject(PlatformLanguageToken) lang: string,
    translate: TranslateService
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');

    // ensure default platform language is set
    translate.use(lang);
  }
}
