import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //propiedad
  public form_login: FormGroup;

  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private userService: LoginService,
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    this.form_login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(): void {
    const formValue = this.form_login.value;
    this.userService.login(formValue).subscribe((res) => {
      if (res !== null) {
        this.redirectUsers();
      }
    });
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectUsers(): void {
    this.router.navigateByUrl('/list');
  }
}
