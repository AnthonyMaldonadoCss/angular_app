import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * El nombre de las clases o métodos no se pueden cambiar
 * */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  API_URL = 'https://reqres.in/api/users';

  getUsers(url: any) {
    return this.http.get(url);
  }

  createUser(id: any) {
    return this.http.post(this.API_URL, id);
  }

  deleteUserForIndex(index: number) {}
}
