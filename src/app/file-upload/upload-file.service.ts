import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(public http: HttpClient) {

  }
  backenedUrl = environment.BACKEND_URL;
  uploadAttachment(data: any):Observable<any> {
    const url = this.backenedUrl + 'attachment/uploadAttachment';
    return this.http.post(url, data)
  }


  downloadAttachment(id: string):Observable<any>{
    const url = this.backenedUrl + 'attachment/downloadAttachment/' + id;
    return this.http.get(url)
  }

  getAllAttachment():Observable<any>{
    const url = this.backenedUrl + 'attachment/getAllAttachment';
    return this.http.get(url)
  }
  deleteAttachment(id:string):Observable<any>{
    const url = this.backenedUrl + 'attachment/deleteAttachment/'+id;
    return this.http.get(url)
  }
 
  getAttachment(id:string):Observable<any>{
    const url = this.backenedUrl + 'attachment/getAttachment/'+id;
    return this.http.get(url )
  }

  getFile(id:string):Observable<any>{
    const url = this.backenedUrl + 'getFile/downloadAttachment/'+id;
    return this.http.get(url,{ responseType:'blob' })
  }
}
