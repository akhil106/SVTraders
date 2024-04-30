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

  // productList

  getProductList(): Observable<any> {
    return this.http.get<any>(this.url+'productList')
  }

  createProductList(postData:any): Observable<any> {
    return this.http.post<any>(this.url+'productList',postData)
  }

  updateProductList(postData:any): Observable<any> {
    return this.http.put<any>(this.url+'productList/',postData)
  }

  deleteProductList(id:any): Observable<any> {
    return this.http.delete<any>(this.url+'productList/'+id)
  }

// productTypeList

  createProductTypeList(postData:any): Observable<any> {
    return this.http.post<any>(this.url+'productTypes',postData)
  }
  getProductTypeList(): Observable<any> {
    return this.http.get<any>(this.url+'productTypes')
  }

  updateProductTypeList(postData:any,id:string): Observable<any> {
    return this.http.put<any>(this.url+'productTypes/'+id,postData)
  }

  deleteProductTypeList(id:any): Observable<any> {
    return this.http.delete<any>(this.url+'productTypes/'+id)
  }


  // productCategories

  createProductCategoryList(postData:any): Observable<any> {
    return this.http.post<any>(this.url+'productCategories',postData)
  }

  getProductCategoryList(): Observable<any> {
    return this.http.get<any>(this.url+'productCategories')
  }

  updateProductCategoryList(postData:any,id:string): Observable<any> {
    return this.http.put<any>(this.url+'productCategories/'+id,postData)
  }

  deleteProductCategoryList(id:any): Observable<any> {
    return this.http.delete<any>(this.url+'productCategories/'+id)
  }

}
