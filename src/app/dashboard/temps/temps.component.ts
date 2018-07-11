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
  tempSolar: number;
  tempWater: number;
  timestamp: string;

  temps: Temps;

  constructor(private route: ActivatedRoute, private tempService: TempsService) { }

  showInitTemps() {
    this.route.data.subscribe(({ temps }) => {
      this.tempSolar = temps[this.solarNum].rawValue;
      this.tempWater = temps[this.waterNum].rawValue;
    });
  }

  updateTemps() {
    this.tempService.channel.bind('data-update-event', data => {
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
