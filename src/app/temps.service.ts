import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getTemp(temp: String) {
    return this.http.get<Temps>(this.tempUrl + temp);
  }

}
