import { LoginService } from './shared/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

declare var Metro: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  navigateTo: string;
  validandoLogin = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      perfil: this.fb.control('', [Validators.required])
    });

    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  login() {
    this.validandoLogin = true;
    this.loginService
      .login(this.loginForm.value.perfil, this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        user => {
          Metro.notify.create(`Bem vindo(a) ${user.Usuario}`, 'Olá', {cls: 'secondary'});
        }, // this.notificationService.notify(`Bem vindo(a), ${user.name}`),
        // httpErrorResponse
        error => {
          this.validandoLogin = false;
          Metro.notify.create('Usuário e/ou senha inválidos.', 'Atenção', {cls: 'alert'});
        }, // this.notificationService.notify(`${error.error.message}`),
        () => {
          this.validandoLogin = false;
          const navigation = [atob(this.navigateTo)].toString();
          if (navigation === 'undefined') {
              this.router.navigate(['']);
          } else {
            this.router.navigate([`${navigation}`]);
            console.log(navigation);
          }
         // this.router.navigate([atob(this.navigateTo)]);
        }
      );
  }
}
