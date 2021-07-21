import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-event-management',
  templateUrl: './user-event-management.component.html',
  styleUrls: ['./user-event-management.component.css']
})
export class UserEventManagementComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/"]);
  }
}
