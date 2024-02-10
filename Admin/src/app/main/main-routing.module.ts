import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { AuthGuard } from '../Services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component:MainComponent,
    children: [
      { path:'home',loadChildren: ()=> import('../Components/home/home.module').then(module=>module.HomeModule)},
      { path:'table', loadChildren: ()=> import('../Components/table/table.module').then(module=>module.TableModule)},
      { path:'profile', loadChildren: ()=> import('../Components/profile/profile.module').then(module=>module.ProfileModule) },
      { path:'hotelmanage',loadChildren: ()=> import('../Components/hotelmanage/hotelmange.module').then(module=>module.HotelManageModule)},
      { path:'materialmanage',loadChildren: ()=> import('../Components/materialmanage/materialmanage.module').then(module=>module.MaterialManageModule)},
      { path:'',redirectTo:'/main/hotelmanage',pathMatch:'full'}
    ],
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {

}
