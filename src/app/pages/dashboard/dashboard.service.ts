import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'https://tcc-integracao.herokuapp.com/integracao/dashboard';

  constructor(private http: HttpClient) { }

  loadDataByMunicipio(municipio: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('municipio', municipio);

    const req = new HttpRequest('POST', `${this.baseUrl}/dados`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
