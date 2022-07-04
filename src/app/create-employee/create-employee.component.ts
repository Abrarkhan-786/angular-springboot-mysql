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
  model=new Employee();
    employeeForm= new FormGroup({
    id:new FormControl('',[]),
    name:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_ALPHABETS)]),
    email:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.EMAIL)]),
    department:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_ALPHA_NUMERIC_WITH_SPACE)]),
    salary:new FormControl('',[Validators.required,Validators.pattern(regix_patterns.ONLY_NUMERIC_FLOAT)]),
    document:new FormControl('',[]),
    senior:new FormControl(true,[])
  })

  ngOnInit(): void {
  }

  save(){
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched();
      return;
    }
    
    this.model.id=this.employeeForm.value.id?Number(this.employeeForm.value.id):null;
    this.model.name=(this.employeeForm.value.name)?this.employeeForm.value.name:null;
    this.model.department=(this.employeeForm.value.department)?this.employeeForm.value.department:null;
    this.model.salary=(this.employeeForm.value.salary)?Number(this.employeeForm.value.salary):null
    this.model.email=(this.employeeForm.value.email)?this.employeeForm.value.email:null;
    this.model.senior=this.employeeForm.value.senior
    console.log(this.model)

    this.service.saveEmployee(this.model).subscribe((data) => { 
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
  getFile(e:any){
    const allowedExtension:{[key:string]:any}={"png":true,"jpeg":true,"docx":true}
    let extension:boolean=false
    console.log(e.target.files);
    if(e.target.files[0].size/1024/1024>10){
      alert("10 mb file is allowed");
      return;
    }
      let name=e.target.files[0].name.split(".").pop();
      extension=allowedExtension[name];
      if(!extension){
        alert("Please upload "+Object.keys(allowedExtension)+ "upload file");
        return;
      }

      this.employeeForm.controls["document"].setValue(e.target.files[0].name);
      //this.model.document=e.target.files[0];

  }
}
