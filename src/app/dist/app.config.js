"use strict";
exports.__esModule = true;
exports.appConfig = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var http_1 = require("@angular/common/http");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_toastr_1 = require("ngx-toastr");
var errorr_interceptor_1 = require("./_Interceptos/errorr.interceptor");
var jwt_interceptor_1 = require("./_Interceptos/jwt.interceptor");
var ngx_spinner_1 = require("ngx-spinner");
var loading_interceptor_1 = require("./_Interceptos/loading.interceptor");
var ngx_timeago_1 = require("ngx-timeago");
exports.appConfig = {
    providers: [
        router_1.provideRouter(app_routes_1.routes),
        http_1.provideHttpClient(http_1.withInterceptors([errorr_interceptor_1.errorInterceptor, jwt_interceptor_1.jwtInterceptor, loading_interceptor_1.loadingInterceptor])),
        animations_1.provideAnimations(),
        ngx_toastr_1.provideToastr({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: true,
            enableHtml: true
        }),
        core_1.importProvidersFrom(ngx_spinner_1.NgxSpinnerModule, ngx_timeago_1.TimeagoModule.forRoot())
    ]
};
