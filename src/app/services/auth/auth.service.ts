import { inject, Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  login(email: string, password: string): Observable<boolean> {
    return this.httpClient.get<User[]>('http://localhost:3000/users').pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        console.log("user")
        if (user) {
          this.currentUser = user;
          console.log('User logged in:', this.currentUser);
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          return true;
        }
        return false;
      })
    );
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = JSON.parse(user) as User;
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: 'admin' | 'user' | 'manager'): boolean {
    return this.getCurrentUser()?.role === role;
  }

  logOut(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
