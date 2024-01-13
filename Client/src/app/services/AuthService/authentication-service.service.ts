import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  getToken(): string | null {
    return localStorage.getItem('Token');
  }

  setToken(token: string): void {
    localStorage.setItem('Token', token);
  }

  isAuthenticated(): boolean {
    return !this.getToken();
  }

  logout(): void {
    localStorage.removeItem('Token');
  }
}
