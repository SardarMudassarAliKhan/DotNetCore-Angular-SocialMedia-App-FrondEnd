import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { environment } from '../../environments/environment.development';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RegisterComponent]
})
export class HomeComponent{
  registerMode = false;
  bseUrl = environment.apiUrl;

  registerToggle() {
    this.registerMode = !this.registerMode
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}