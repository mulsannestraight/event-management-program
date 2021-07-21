import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {LoginInfo} from "../models/login-info";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  credentials: any = [
    {username: "admin", password: "admin"},
    {username: "test", password: "test"},
    {username: "user", password: "user"}
  ];

  constructor() { }

  login(username: string, password: string): Observable<LoginInfo> {
    let userMatchIndex = this.credentials.findIndex((user: any) => user.username === username);

    if (userMatchIndex === -1) {
      return of({username: "", role: ""});
    } else {
      let user = this.credentials[userMatchIndex];

      if (user.password === password) {
        if (user.username === "admin") {
          return of({username: "admin", role: "admin"});
        } else {
          return of({username: user.username, role: "user"});
        }
      } else {
        return of({username: "", role: ""});
      }
    }
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  }
}
