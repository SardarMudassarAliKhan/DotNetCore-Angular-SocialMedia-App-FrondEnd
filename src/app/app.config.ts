import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './_Interceptos/errorr.interceptor';

export const appConfig: ApplicationConfig = {
  providers:
  [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
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
    )
  ]

};
