import { TempsService, Temps } from './../../../temps.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solar',
  templateUrl: './solar.component.html',
  styleUrls: ['./solar.component.scss']
})
export class SolarComponent implements OnInit {

  tempSolar: number;
  timestamp: string;
  solarURL = 'tempSolar';
  temps: Temps;
  constructor(private tempService: TempsService) {
    this.showTemp();
   }

  showTemp() {
    this.tempService.getTemp(this.solarURL)
      .subscribe(data => {
        this.tempSolar = data.rawValue;
        this.timestamp = data.time;
      });
  }

  ngOnInit() {
  }

}
