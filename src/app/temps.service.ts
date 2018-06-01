import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TempsComponent } from './dashboard/temps/temps.component'
import { Observable } from 'rxjs/internal/Observable';

export interface Temps {
  id: string;
  time: string;
  date: string;
  name: string;
  rawValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class TempsService {

  constructor(private http: HttpClient) { }

  url: string = window.location.hostname;

  tempUrl = 'http://' + this.url + ':3000/latestTime/';

  public getTemp(temp: String): Observable<Temps> {
    return this.http.get<Temps>(this.tempUrl + temp)
  }
}
