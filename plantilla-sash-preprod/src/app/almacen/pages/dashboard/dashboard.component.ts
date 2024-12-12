import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { UrlEnviromentService } from 'src/app/shared/services/url-enviroment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: []
  constructor(private httpClient: HttpClient, private envUrl: UrlEnviromentService) { }

  ngOnInit(): void {

  }
  // GetRolesUser() {
  //   console.log('llego hasta aqui: ' + this.envUrl.urlAddress + 'users/list/roles-user/');
  //   return this.httpClient.get(this.envUrl.urlAddress + 'users/list/roles-user/');
  // }
  GetRolesUser(): Observable<any> {
    return this.httpClient.get(this.envUrl.urlAddress + 'users/list/roles-user/');
  }
  listMenu() {
    // this.GetRolesUser().subscribe(resp => {
    //   console.log(resp['data.id'] + 'listMenu')
    //   if (resp['success'] == true) {
    //     this.data = resp['data']
    //   }
    // })
    this.GetRolesUser().subscribe(
      (response) => {
        const userId = response.data.id; // Accede a 'id'
        const userRoles = response.data.rol; // Accede a 'roles'
        console.log('id:', userId);
        console.log('Roles:', userRoles);
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

}
