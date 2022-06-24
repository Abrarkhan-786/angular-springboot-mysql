import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  backenedUrl = environment.BACKEND_URL;
  constructor(public http: HttpClient) {

  }
  saveEmployee(employee: Employee):Observable<any> {
    const url = this.backenedUrl + 'employee/saveEmployee';
    return this.http.post(url, employee)
  }

  updateEmployee(employee: Employee):Observable<any> {
    const url = this.backenedUrl + 'employee/updateEmployee';
    return this.http.post(url, employee)
  }

  findEmployeeById(id: number):Observable<any>{
    const url = this.backenedUrl + 'employee/findEmployeeById/' + id;
    return this.http.get(url)
  }

  getAllEmployeeList():Observable<any> {
    const url = this.backenedUrl + 'employee/getAllEmployeeList';
    return this.http.get(url)
  }

  deleteEmployeeById(id: number) :Observable<any>{
    const url = this.backenedUrl + 'employee/deleteEmployeeById/' + id;
    return this.http.get(url)
  }

}
