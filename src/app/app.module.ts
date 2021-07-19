import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterUserByNamePipe } from '@shared/pipes/filter-user-by-name/filter-user-by-name.pipe';

import { CreateUserComponent } from '@feature/users/create-user/create-user.component';
import { HomeUserComponent } from '@feature/users/home-user/home-user.component';
import { ListUsersComponent } from '@feature/users/list-users/list-users.component';
import { NavBarComponent } from '@feature/users/nav-bar/nav-bar.component';
import { LoginComponent } from '@feature/login/login/login.component';

import { ErrorTailorModule } from '@ngneat/error-tailor';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    HomeUserComponent,
    ListUsersComponent,
    NavBarComponent,
    LoginComponent,
    FilterUserByNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Password is required',
          minlength: ({ requiredLength, actualLength }) =>
            `The minimum of characters will be ${requiredLength} but got ${actualLength}`,
          invalidAddress: (error) => `Address isn't valid`,
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
