import { NgIf, TitleCasePipe } from '@angular/common';
import { AccountService } from './../_Services/account.service';
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
export class NavbarComponent {

  model: any = { username: '', password: '' };
  accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  constructor() { }

  login(){
    this.accountService.login(this.model).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl('/members');
          this.toast.success("Login Success")
        },
        error: (error) => {
          console.log(error);
          this.toast.error(error.error);
        }
      }
    );
  }

  register(form: NgForm) {
    this.accountService.register(form.value).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.toast.success("Register Success")
        },
        error: (error) => {
          console.log(error);
          this.toast.error(error.error);
        }
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
