import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Temps, TempsService } from '../temps.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TempResolver implements Resolve<Temps> {

  constructor(private tempService: TempsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Temps> {
    return this.tempService.getTemp('temp')
      .pipe(
        catchError(error => {
          return EMPTY;
        })
      );
  }
}
