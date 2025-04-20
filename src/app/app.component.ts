import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient);
  title = 'DotNetCore-Angular-SocialMedia-App';

  users: any;

  ngOnInit(): void {
    this.http.get('https://localhost:44383/api/User').subscribe({
      next: (response) => {
        console.log(response);
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }
}
