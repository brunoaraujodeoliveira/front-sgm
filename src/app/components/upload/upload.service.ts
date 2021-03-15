import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = 'https://tcc-gateway.herokuapp.com/api/monitoramento/imagem';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  fileList(): Observable<HttpEvent<any>> {
    const req = new HttpRequest('GET', `${this.baseUrl}/list`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
