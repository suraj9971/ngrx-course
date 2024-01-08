import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const authState = createFeatureSelector<AuthState>("auth") 

export const isUserLoggedIn = createSelector(
    authState,
    auth => !!auth.user
)

export const isLoggedOut = createSelector(
    isUserLoggedIn,
    loggedIn=>!loggedIn
)