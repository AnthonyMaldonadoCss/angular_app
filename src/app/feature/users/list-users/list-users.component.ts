import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../create-user/shared/services/users/users.service';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  public ngOnInit(): void {}

  datosUsuarios = [];

  constructor(public user: UsersService) {
    this.user.getUsers('https://reqres.in/api/users').subscribe((res: any) => {
      this.datosUsuarios = res.data;
      console.log(typeof res, res);
    });
  }

  filterName = '';
}
