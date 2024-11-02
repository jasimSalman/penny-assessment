import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as RegisterActions from './registration.actions';
import { RegisterService } from '../../services/register.service';

@Injectable({
  providedIn: 'root',
})
export class RegsiterEffects {
  private actions$ = inject(Actions);
  private registerService = inject(RegisterService);
  private router = inject(Router);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      mergeMap(({ credentials }) =>
        this.registerService.register(credentials).pipe(
          map(response => RegisterActions.registerSuccess({ response })),
          catchError(error => of(RegisterActions.registerFailure({ error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterActions.registerSuccess),
        tap(({ response }) => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
