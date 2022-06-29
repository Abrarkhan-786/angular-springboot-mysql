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


  downloadAttachment(id: number):Observable<any>{
    const url = this.backenedUrl + 'attachment/downloadAttachment/' + id;
    return this.http.get(url)
  }
}
