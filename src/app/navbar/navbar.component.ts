import { NgIf } from '@angular/common';
import { AccountService } from './../_Services/account.service';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  model: any = { username: '', password: '' };
  accountService = inject(AccountService);

  constructor() { }

  login(){
    this.accountService.login(this.model).subscribe(
      {
        next: (response) => {
          console.log(response);
          alert("Login successful")
        },
        error: (error) => {
          console.log(error);
          alert("Login Faild")
        }
      }
    );
  }

  register(form: NgForm) {
    this.accountService.register(form.value).subscribe(
      {
        next: (response) => {
          console.log(response);
          alert("Register successful")
        },
        error: (error) => {
          console.log(error);
          alert("Register Faild")
        }
      }
    );
  }

  logout() {
    this.accountService.logout();
    alert("Logout successful")
  }

}
