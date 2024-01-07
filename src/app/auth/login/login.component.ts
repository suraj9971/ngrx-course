import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {State, Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop, pipe} from "rxjs";
import {Router} from "@angular/router";
import { AuthState } from '../reducers';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store:Store<AuthState>
      ) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    const val = this.form.value
    this.auth.login(val.email,val.password).subscribe(noop,
      pipe(
          this.store.dispatch()
        tap(user=>{
            this.router.navigateByUrl("/courses")
        })
      )
    )

  
  }

}

