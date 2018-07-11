import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

declare const Pusher: any;

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

  pusher: any;
  channel: any;

  constructor(private http: HttpClient) {
    this.pusher = new Pusher('8a6d04a328c3b05e85f2', {
      cluster: 'eu',
      encrypted: true
    });
    this.channel = this.pusher.subscribe('vbus-channel');
  }

  url: string = window.location.hostname;

  tempUrl = 'http://' + this.url + ':3000/latestTime/';

  public getTemp(temp: String): Observable<Temps> {
    return this.http.get<Temps>(this.tempUrl + temp);
  }
}
