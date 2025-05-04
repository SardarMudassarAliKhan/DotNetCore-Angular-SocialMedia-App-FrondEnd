import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './_Interceptos/errorr.interceptor';
import { jwtInterceptor } from './_Interceptos/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './_Interceptos/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers:
  [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor,jwtInterceptor,loadingInterceptor])),
    provideAnimations(),
    provideToastr(
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: true,
        enableHtml: true,
      }
    ),
    importProvidersFrom(    
      NgxSpinnerModule,
    )
  ]

};
