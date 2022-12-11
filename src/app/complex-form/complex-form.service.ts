import { environment } from './../../environments/environment'
import { catchError, delay, Observable, of, map, mapTo } from 'rxjs'
import { ComplexFormValue } from './models/complex-form-value.model'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable()
export class ComplexFormService {

  constructor(private http: HttpClient) { }

  public saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
      mapTo(true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    )
  }
}
