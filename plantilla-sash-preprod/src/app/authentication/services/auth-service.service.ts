import { Injectable } from '@angular/core';
import {UrlEnviromentService} from '../../shared/services/url-enviroment.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn')  || 'false');
  constructor(private httpClient: HttpClient, private envUrl: UrlEnviromentService) { }

  login(data: any){
    return this.httpClient.post<any>(this.envUrl.urlAddress + 'token/', data);
  }

  logout(url_paht){
    return this.httpClient.get(this.envUrl.urlAddress + url_paht);
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn')  || this.loggedInStatus.toString());
  }
  listConfig(){
    return this.httpClient.get<any>(this.envUrl.urlAddress + 'au/faa3db6f/', )
  }
  getoken() {
    return localStorage.getItem('token');
  }

  isLoggedInUser(): boolean {
    const authToken = localStorage.getItem('token');
    return (authToken != null) ? true : false;
  }

  isLogoutUnathorizated() {
    this.setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('rus');
  }

  updatePassword(data, token){
    const headers = new HttpHeaders().set('Authorization', 'Token '+ token);
    return this.httpClient.post<any>(this.envUrl.urlAddress + 'users/email-reestablecer-password/', data, {headers: headers})
  }

  restorePassword(data, token){
    const headers = new HttpHeaders().set('Authorization', 'Token '+ token);
    return this.httpClient.post<any>(this.envUrl.urlAddress + 'users/reestablecer-password/', data, {headers: headers})
  }

  validateCode(data, token){
    const headers = new HttpHeaders().set('Authorization', 'Token '+ token);
    return this.httpClient.post<any>(this.envUrl.urlAddress + 'users/validar-codigo-url/', data, {headers: headers})
  }
}
