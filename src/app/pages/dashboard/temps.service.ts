import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface Temps {
  id: string;
  time: string;
  date: string;
  name: string;
  rawValue: number;
}

@Injectable()
export class TempsService {
  constructor(private http: HttpClient) { }

  url: string = window.location.hostname;

  tempUrl = 'http://' + this.url + ':3000/latestTime/';

  getTemps(type: string): Observable<Temps> {
    return this.http.get<Temps>(this.tempUrl + type);
  }
}
