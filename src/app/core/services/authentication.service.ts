import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { User, AuthUser, AuthToken } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: AuthToken;

  constructor(private http: HttpClient) { }

  public get currentUserValue(): AuthToken {
    return this.token;
  }

  public signIn(authUser: AuthUser): Observable<AuthUser> {
    return this.http
      .post<any>(`${environment.apiUrl}Token`, authUser)
      .pipe(
        map(user => {
          this.token = user.data['access_token'];
          return user;
        })
      );
  }

  public registerNewUser(newUser: User): Observable<User> {
    return this.http
      .post<any>(`${environment.apiUrl}Register`, newUser);
  }

  public listUsers(): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentUserValue}`
    });

    return this.http
      .get<any>(`${environment.apiUrl}List?limit=20`, { headers: headers });
  }
}
