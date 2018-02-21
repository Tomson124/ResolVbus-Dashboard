import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

const config = require('./../../../../../config');

@Component({
  selector: 'solar-temp',
  styleUrls: ['./solar.component.scss'],
  templateUrl: './solar.component.html',
})
export class SolarComponent implements AfterViewInit {
  ngAfterViewInit(): void {

    let elTemp1 = document.getElementById('temp1');
    let elTime = document.getElementById('time');

    let tempValue;
    let timestamp;
    let temp;

    let logging = function() {
      let json = $.getJSON('http://localhost:3000/latestTime/temp1', function(data) {
        tempValue = data['rawValue'];
        timestamp = data['time'];
        temp = tempValue.toFixed(1).toString().replace('.', ',');
      }).done(function() {
        elTemp1.innerHTML = temp + '&deg;C';
        elTime.innerHTML = timestamp + ' ' + 'Uhr';
      });
    }

    logging();

    setInterval(function() {
      logging();
    }, config.loggingInterval + 2000);
  }
}
