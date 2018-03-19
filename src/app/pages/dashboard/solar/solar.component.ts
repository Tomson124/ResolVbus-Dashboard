import { Component, OnInit, Inject } from '@angular/core';
import { TempsService, Temps } from '../temps.service';
import { tap } from 'rxjs/operators';

const config = require('./../../../../../config');

@Component({
  selector: 'solar-temp',
  styleUrls: ['./solar.component.scss'],
  templateUrl: './solar.component.html',
})
export class SolarComponent implements OnInit {

  temp: Temps;
  showSolar: boolean;

  constructor(private tempService: TempsService) {}

  ngOnInit() {
    this.showSolarTemp();
    this.showSolar = this.setShow(this.temp.rawValue);
    alert(this.showSolar)
    //timeStamp = '14:00';
  }

  showSolarTemp() {
    this.tempService.getTemps('tempSolar')
      .subscribe((data) => this.temp = data);
  }

  setShow(value: number) {
    if (value === undefined) {
      return false;
    } else {
      return true;
    }
  }
}

/* export class SolarComponent implements OnInit {
  ngOnInit(): void {

    const elTemp1 = document.getElementById('tempSolar');
    const elTime = document.getElementById('timeSolar');

    let tempValue;
    let timestamp;
    let temp;

    const url = window.location.hostname;

    let logging = function() {
      let json = $.getJSON('http://' + url + ':3000/latestTime/tempSolar', function(data) {
        tempValue = data['rawValue'];
        timestamp = data['time'];
        temp = tempValue.toFixed(1).toString().replace('.', ',');
      }).done(function() {
        elTemp1.innerHTML = temp + '<small>&deg;C</small>';
        elTime.innerHTML = timestamp + ' ' + 'Uhr';
      });
    }

    logging();

    setInterval(function() {
      logging();
    }, config.loggingInterval + 500);
  }
}
*/