import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { ListComponent } from '../list/list.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { 
    path: '', component: LoginComponent, children: [
      {
        path: '', 
        component: SigninComponent
      },
      { 
        path: 'register', 
        component: RegisterComponent 
      },
      {
        path: 'list', 
        component: ListComponent,
        canActivate: [AuthGuard]
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
