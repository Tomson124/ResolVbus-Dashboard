import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

const config = require('./../../../../../config');

@Component({
  selector: 'water-temp',
  styleUrls: ['./water.component.scss'],
  templateUrl: './water.component.html',
})

export class WaterComponent implements AfterViewInit {
  ngAfterViewInit(): void {

    const elTemp1 = document.getElementById('tempWater');
    const elTime = document.getElementById('timeWater');

    let tempValue;
    let timestamp;
    let temp;

    const url = window.location.hostname;

    let logging = function() {
      let json = $.getJSON('http://' + url + ':3000/latestTime/tempWater', function(data) {
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
    }, config.loggingInterval + 1000);
  }
}
