import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../common/utility/snackbar.service';
import { HttpStatus } from '../constant/enum';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MSG } from '../error-message';
import { regix_patterns } from '../shared/regix_patterns';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  title:string='Add Employee Form';
  backurl:string='/allEmployee';
  MESSAGE=MSG;
  constructor(
    private service:EmployeeService,
    private snackbarService:SnackbarService,

  ) { }

    employeeForm= new FormGroup({
    id:new FormControl('',[]),
    name:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_ALPHABETS)]),
    email:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.EMAIL)]),
    department:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_ALPHA_NUMERIC_WITH_SPACE)]),
    salary:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_NUMERIC_FLOAT)]),
    isSenior:new FormControl('',[])
  })

  ngOnInit(): void {
  }

  save(){
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched();
      return;
    }
    const model=new Employee();
    model.id=this.employeeForm.value.id?Number(this.employeeForm.value.id):null;
    model.name=(this.employeeForm.value.name)?this.employeeForm.value.name:null;
    model.department=(this.employeeForm.value.department)?this.employeeForm.value.department:null;
    model.salary=(this.employeeForm.value.salary)?Number(this.employeeForm.value.salary):null
    model.email=(this.employeeForm.value.email)?this.employeeForm.value.email:null;
    model.isSenior=Boolean(this.employeeForm.value.isSenior)
    console.log(model)

    this.service.saveEmployee(model).subscribe((data) => { 
      if (data != null && data != undefined && data.status == HttpStatus.SUCCESS) {
          this.snackbarService.openSucessSnackBar(data.message,this.backurl)
           }else{
            this.snackbarService.openErrorSnackBar(data.message)
           }        
     });
  }

  resetForm(){
    this.employeeForm.reset();
  }
}
