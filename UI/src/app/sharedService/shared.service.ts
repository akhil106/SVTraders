import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  url = environment.urlMappings.playApiUrl;
  constructor(private http: HttpClient) { }

  getProductList(): Observable<any> {
    return this.http.get<any>(this.url+'productList')
  }

  createProductList(postData:any): Observable<any> {
    return this.http.post<any>(this.url+'productList',postData)
  }

  updateProductList(postData:any): Observable<any> {
    return this.http.put<any>(this.url+'productList',postData)
  }

  deleteProductList(id:any): Observable<any> {
    return this.http.delete<any>(this.url+'productList/'+id)
  }
}
