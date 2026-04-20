import { Injectable, inject, signal, computed} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForAuth, User, LoginCredentials } from '../../shared/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // backend end point

  private user = signal<User | null>(null);

  isLoggedIn = computed(() => this.user() !== null);
  currentUser = computed(() => this.user());

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials, { withCredentials: true});
  }

  register(userData: UserForAuth): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData, { withCredentials: true});
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {} , { withCredentials: true});
  }
  
  setSession(user: User): void {
    this.user.set(user);
  }

  clearSession(): void {
    this.user.set(null);
  }
}
