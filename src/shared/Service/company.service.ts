import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { environment } from '../../environments/environment';
import {Company, DuplicateCompanies} from'../Models/company'
import 'rxjs/add/operator/catch'
import { throwError, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl: string = environment.apiUrl;
  public apiUrl = `${this.baseUrl}/companies`;
  public DuplicateCompany_API = `${this.baseUrl}/companies/duplicates`;
  companies: Observable <Company[]> ;
  constructor(private http:HttpClient) { 

  }
  getAllCompany() {
      return this.http.get(this.apiUrl);
  }
  getCompany(companyId) {
    return this.http.get(`${this.apiUrl}/${companyId}`);
  }
  saveCompany(company: Company): Observable<Company> {
    let result: Observable<Company>;
   console.log(`${company.IsDuplicate}`);
    if (company.CompanyID>0) {
      result = this.http.put<Company>(
        `${this.apiUrl}/${company.CompanyID}`,
        company
      )
    .catch(this.errorHandler);
    } else {
      result = this.http.post<Company>(this.apiUrl, company);
    }
    return result;
  }

  deleteCompany(id: number) {
    return this.http.delete(`${this.apiUrl}/${id.toString()}`);
  }
  getDuplicateCompanies() :Observable<Array<DuplicateCompanies>>{
    console.log(this.apiUrl);
    return this.http.get<Array<DuplicateCompanies>>(this.DuplicateCompany_API);
  }
  getDuplicateCompany(name: string) {
    return this.http.get(`${this.DuplicateCompany_API}/${name}`);
  }
  errorMessage;
  errorHandler(error: HttpErrorResponse)
  {
    const err =  JSON.stringify(error.error);
    return throwError(error.error.ModelState.Error || "Server Error")

  }
}
