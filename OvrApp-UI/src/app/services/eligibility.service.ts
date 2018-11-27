import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IEligibility } from '../model/eligibility';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Global } from '../shared/Global';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class EligibilityService {


  public sharedEligibility = {};


constructor(private http: HttpClient) { }

// getAllEligibility(url: string): Observable<IEligibility[]> {
  getAllEligibility(url: string): Observable<IEligibility[]> {
  return this.http.get<IEligibility[]>(Global.BASE_USER_ENDPOINT+'ovrapp/getAllEligibility')
    .pipe(
      catchError(this.handleError)
    );
}

// Get Customer By Id
getOneEligibility(id: number): Observable<IEligibility> {
  
  const newurl = Global.BASE_USER_ENDPOINT+'ovrapp/' + id;
 return this.http.get<IEligibility>(newurl)
 .pipe(
   catchError(this.handleError)
 );
}

// insert new contact details
addEligibility(ieligibility: IEligibility): Observable<any> {  
  alert("called");
  return this.http.post<IEligibility>(Global.BASE_USER_ENDPOINT+'ovrapp', ieligibility, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}


postEligibility(ieligibility: IEligibility): Observable<HttpResponse<IEligibility>> {
  const httpHeaders = new HttpHeaders({
       'Content-Type' : 'application/json'
  });
  return this.http.post<IEligibility>(Global.BASE_USER_ENDPOINT+'ovrapp', ieligibility,
      {
        headers: httpHeaders,
        observe: 'response'
      }
  );
}



updateEligibility(id:number,ieligibility: IEligibility): Observable<IEligibility> {  
  alert("called");
  return this.http.put<IEligibility>(Global.BASE_USER_ENDPOINT+'ovrapp/'+id, ieligibility, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

// custom handler
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
}

}
