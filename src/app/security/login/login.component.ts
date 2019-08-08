
// import { NotificationService } from './../../shared/messages/notification.service';
import { LoginService } from './shared/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;

  constructor(private fb: FormBuilder, private loginService: LoginService, private activatedRoute: ActivatedRoute, private router: Router
    ) {}

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });

    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  login() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => console.log(`Bem vindo(a), ${user.username}`), // this.notificationService.notify(`Bem vindo(a), ${user.name}`),
              // httpErrorResponse
                 error => console.log(`error : ${error.error.message} `), // this.notificationService.notify(`${error.error.message}`),
                 () => {
                  this.router.navigate([atob(this.navigateTo)]);
                 }
     );
  }
}
