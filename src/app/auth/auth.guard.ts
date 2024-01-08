import {Injectable} from "@angular/core"
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthState } from "./reducers";
import { State, Store, select } from "@ngrx/store";
import { isUserLoggedIn } from "./auth.selector";
import { AuthActions } from "../action-types";
import { tap } from "rxjs/operators";
@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private store:Store<AuthState>, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            return this.store.pipe(
                select(isUserLoggedIn),
                tap(loggedIn=>{
                    if(!loggedIn){
                        return this.router.navigateByUrl("/")
                    }
                })
            )
    }
}