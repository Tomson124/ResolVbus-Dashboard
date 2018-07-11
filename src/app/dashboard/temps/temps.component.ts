import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TempsService, Temps } from '../../temps.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temps',
  templateUrl: './temps.component.html',
  styleUrls: ['./temps.component.scss']
})
export class TempsComponent implements OnInit, AfterViewInit {

  @Input() solar: boolean;
  solarNum = 0;
  waterNum = 1;
  tempSolar: any;
  tempWater: any;
  timestamp: string;
  error = false;

  temps: Temps;

  constructor(private route: ActivatedRoute, private tempService: TempsService) { }

  showInitTemps() {
    this.route.data.subscribe(({ temps }) => {
      if (temps !== undefined) {
        this.error = false;
        this.tempSolar = temps[this.solarNum].rawValue;
        this.tempWater = temps[this.waterNum].rawValue;
      } else {
        this.error = true;
        this.tempSolar = '---';
        this.tempWater = '---';
      }
    });
  }

  updateTemps() {
    this.tempService.channel.bind('data-update-event', data => {
      this.error = false;
      this.tempSolar = data[this.solarNum].rawValue;
      this.tempWater = data[this.waterNum].rawValue;
    });
  }

  ngOnInit() {
    this.showInitTemps();
  }

  ngAfterViewInit() {
    this.updateTemps();
  }
}
