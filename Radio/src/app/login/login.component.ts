import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Globals } from '../globals';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})

export class LoginComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  input_usr: string = 'username';
  input_pw: string = 'password';
  constructor(private router: Router, private globals: Globals, private http: HttpClient) { }

  ngOnInit() { }

  onSubmit(form){

    this.http.post('http://localhost:8000/api/login',
      {
        username: form.value.username,
        password: form.value.password
      }).subscribe(res => {
          console.log(res)
          this.globals['accessToken'] = res['success'].token;
          this.globals['isLogged'] = true;
          this.router.navigate(['home']);
        }, error => alert(error.error.error + '. Wrong credentials!'));

  }
}
