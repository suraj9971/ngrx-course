import { isDevMode } from '@angular/core';
import {
  ActionReducerMap, createReducer, on, 
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../../action-types';
import { routerReducer } from '@ngrx/router-store';

export const authFeatureKey = 'auth';
export interface Appstate{

}
export const reducers:ActionReducerMap<Appstate> = {
  router:routerReducer
}

export interface AuthState{
  user:User
} 

export const initialAuthState:AuthState ={
  user:undefined
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login,(state,action)=>{
      return {user:action.user}
  }),
  on(AuthActions.logout,(state,action)=>{
    return {user:undefined}
  })

)




