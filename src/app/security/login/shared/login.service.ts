import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user.model";
import { AGE_API } from "./../../../app.api";
import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Injectable()
export class LoginService {
  user: User;
  lastUrl: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => (this.lastUrl = e.url));
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  login(username: string, password: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "'Access-Control-Allow-Origin": "*"
      })
    };
    const body = `username=${username}&password=${password}&grant_type=password`;

    // https://cors-anywhere.herokuapp.com/
    return this.httpClient
      .post<User>(
        `https://cors-anywhere.herokuapp.com/http://www.mscfilho.net:8080/api/v1/Token`,
        body,
        httpOptions
      )
      .pipe(
        map(token => {

          const user = {
            username,
            password,
            access_token : token.access_token
           };

          return this.user = user;
        })
      );
  }
  /*
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  // const usuario =

  return this.httpClient
      .post<User>(`${AGE_API}/Token`, body)
      .pipe(tap(user => {this.user = user; console.log(this.user)}));
  }*/

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(["/login", btoa(path)]);
  }

  logout() {
    this.user = undefined;
  }
}
