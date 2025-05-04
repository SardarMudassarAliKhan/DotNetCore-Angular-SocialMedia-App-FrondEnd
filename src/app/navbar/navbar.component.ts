import { NgIf, TitleCasePipe } from '@angular/common';
import { AccountService } from '../_services/account.service';
import { Component, inject, Pipe } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,RouterLink,BsDropdownModule,RouterLinkActive, TitleCasePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
  export class NavComponent {
    accountService = inject(AccountService);
    private router = inject(Router)
    private toastr = inject(ToastrService);
    model: any = {};
  
    login() {
      this.accountService.login(this.model).subscribe({
        next: _ => {
          this.router.navigateByUrl('/members')
        },
        error: error => this.toastr.error(error.error)
      })
    }
  
    logout() {
      this.accountService.logout();
      this.router.navigateByUrl('/');
    }
  }