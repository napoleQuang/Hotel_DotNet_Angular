import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';

import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  {
    path:'login', component:LoginComponent
  },
  {
    path:'main', loadChildren: ()=> import('./main/main.module').then(module=>module.MainModule), canActivate:[AuthGuard],
  },
  {
    path:'', redirectTo:'/login',pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
