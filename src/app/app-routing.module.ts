import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';


const routes: Routes = [
  { path: '', component: ListEmployeeComponent },
  { path: 'allEmployee', component: ListEmployeeComponent },
  { path: 'addEmployee', component: CreateEmployeeComponent},
  { path: 'editEmployee', component: EditEmployeeComponent },
  { path: 'viewEmployee', component: ViewEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }