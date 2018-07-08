import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TempsService, Temps } from '../../temps.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temps',
  templateUrl: './temps.component.html',
  styleUrls: ['./temps.component.scss']
})
export class TempsComponent implements OnInit {

  @Input() solar: boolean;
  solarNum: number = 0;
  waterNum: number = 1;
  tempSolar: number = 2;
  tempWater: number = 10;
  timestamp: string;

  temps: Temps;

  constructor(private route: ActivatedRoute) { }

  showTemps() {
    this.route.data.subscribe(({ temps }) => {
      //this.temps = temps;
      this.tempSolar = temps[this.solarNum].rawValue;
      this.tempWater = temps[this.waterNum].rawValue;
    });
    //this.tempSolar = this.temps[this.solarNum].rawValue;
    //this.tempWater = this.temps[this.waterNum].rawValue;
    //this.timestamp = this.temps[this.solarNum].time;
  }/*

  updateTemps() {
    this.tempSolar = 5;
    this.tempService.channel.bind('data-update-event', function(data) {
      console.log('number: ' + data[0]);
      this.tempSolar = data[0];
      this.tempWater = data[1].rawValue;
    });
  }*/

  ngOnInit() {
   // this.showTemps();
   this.showTemps();
  }
}
