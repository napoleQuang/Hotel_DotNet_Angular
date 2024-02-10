import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialmanageComponent } from './materialmanage.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path:'',component:MaterialmanageComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialManageRoutingModule { }
