import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  storeRefreshToken(token) {
    localStorage.setItem('REFRESH_TOKEN', token);
  }

  getRefreshToken() {
    return localStorage.getItem('REFRESH_TOKEN');
  }
}
