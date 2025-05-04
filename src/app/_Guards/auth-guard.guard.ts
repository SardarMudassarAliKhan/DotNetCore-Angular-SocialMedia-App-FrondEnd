import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toaster = inject(ToastrService);
  if (accountService.curruntUser()) {
    return true;
  } else {
    toaster.error("You are not logged in");
    return false;
  }


}