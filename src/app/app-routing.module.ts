import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@feature/login/login/login.component';
import { CreateUserComponent } from '@feature/users/create-user/create-user.component';
import { HomeUserComponent } from '@feature/users/home-user/home-user.component';
import { ListUsersComponent } from '@feature/users/list-users/list-users.component';

const MAIN = '/users';

const routes: Routes = [
  { path: '', redirectTo: MAIN, pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'add',
    component: CreateUserComponent,
  },
  {
    path: 'home',
    component: HomeUserComponent,
  },
  {
    path: 'list',
    component: ListUsersComponent,
  },
  {
    path: '',
    loadChildren: () => import('./feature/feature.module').then((i) => i.FeatureModule),
  },
  { path: '**', redirectTo: MAIN, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
