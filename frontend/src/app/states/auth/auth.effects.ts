import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  // constructor(
  //   private actions$: Actions,
  //   private authService: AuthService,
  //   private router: Router
  // ) {}
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response =>
            AuthActions.loginSuccess({ response, redirect: true })
          ),
          catchError(error =>
            of(
              AuthActions.loginFailure({
                error: 'Enter a valid username or password',
              })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ response, redirect }) => {
          this.authService.setUser(response.token, response.user.username);
          if (redirect) {
            this.router.navigate(['/books']);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      mergeMap(() => {
        const user = this.authService.getUser();
        if (user) {
          return of(
            AuthActions.loginSuccess({ response: user, redirect: false })
          );
        } else {
          return of(AuthActions.loginFailure({ error: 'User not found' }));
        }
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ credentials }) =>
        this.authService.register(credentials).pipe(
          map(response => AuthActions.registerSuccess({ response })),
          catchError(error => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(({ response }) => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  generateOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.generateOtp),
      mergeMap(({ username }) =>
        this.authService.sendOtp(username).pipe(
          map(response =>
            AuthActions.generateOtpSuccess({
              message: response.message,
            })
          ),
          catchError(error =>
            of(AuthActions.generateOtpFailure({ error: error.message }))
          )
        )
      )
    )
  );

  validateOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.validateOtp),
      mergeMap(({ username, otp }) =>
        this.authService.validateOtp(username, otp).pipe(
          map(response =>
            AuthActions.validateOtpSuccess({ message: response.message })
          ),
          catchError(error =>
            of(AuthActions.validateOtpFailure({ error: error.message }))
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      mergeMap(({ username, newPassword }) =>
        this.authService.resetPassword(username, newPassword).pipe(
          map(response =>
            AuthActions.resetPasswordSuccess({ message: response.message })
          ),
          tap(() => this.router.navigate(['login'])),
          catchError(error =>
            of(AuthActions.resetPasswordFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
