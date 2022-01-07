import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  isLoginInvalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

    this.loginService.login(username, password).subscribe(
      (data) => {
        if (data.username === '') {
          this.isLoginInvalid = true;
        } else {
          this.isLoginInvalid = false;

          localStorage.setItem('username', data.username);
          localStorage.setItem('role', data.role);
          console.log(localStorage);

          if (localStorage.getItem('role') === 'admin') {
            this.router.navigate(['/event_mgmt']);
          } else {
            this.router.navigate(['/user_event_mgmt']);
          }
        }
      }
    );
  }
}
