import { HttpClient } from '@angular/common/http';
import { inject, Injectable , signal} from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../_Models/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient)
  baseurl = environment.apiUrl;
  curruntUser = signal<User | null>(null)


  constructor() { }

  login(model: any) {
    return this.http.post<User>(this.baseurl + 'account/login', model).pipe(
      map(user=>{
        const userData = user as User
        if (userData) {
          this.curruntUser.set(userData)
          localStorage.setItem('user', JSON.stringify(userData))
        }
        return userData
      }) 
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseurl + 'account/register', model).pipe(
      map((user: User) => {
        const userData = user as User
        if (userData) {
          this.curruntUser.set(userData)
          localStorage.setItem('user', JSON.stringify(userData))
        }
        return userData
         })
    ) 
  }

  logout() {
    this.curruntUser.set(null)
    localStorage.removeItem('user')
  }
}
