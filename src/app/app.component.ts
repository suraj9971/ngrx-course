import {Component, OnInit} from '@angular/core';
import {select, State, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AuthState } from './auth/reducers';
import {isUserLoggedIn, isLoggedOut} from "./auth/auth.selector"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$ : Observable<boolean>
    isLoggedOut$ : Observable<boolean>

    constructor(private router: Router, private store:Store<AuthState>) {

    }

    ngOnInit() {
      console.log(this.store.subscribe(adta => console.log(adta)));
      
      this.isLoggedIn$ = this.store.pipe(
          select(isUserLoggedIn)
        )
        console.log(this.isLoggedIn$.subscribe(data=>console.log(data)));
        
      this.isLoggedOut$ = this.store.pipe(
        select(isLoggedOut)
        )

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

    }

    logout() {

    }

}
