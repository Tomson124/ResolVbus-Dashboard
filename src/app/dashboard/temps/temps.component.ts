import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TempsService } from '../../temps.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temps',
  templateUrl: './temps.component.html',
  styleUrls: ['./temps.component.scss'],
  animations: []
})
export class TempsComponent implements OnInit, AfterViewInit {

  @Input() solar: boolean;
  solarNum = 0;
  waterNum = 1;
  timestampNum = 2;
  tempSolar: any;
  tempWater: any;
  timestamp: string;
  error = false;

  constructor(private route: ActivatedRoute, private tempService: TempsService) { }

  showInitTemps() {
    this.route.data.subscribe(({ temps }) => {
      if (temps !== undefined) {
        this.error = false;
        this.tempSolar = temps[this.solarNum].rawValue;
        this.tempWater = temps[this.waterNum].rawValue;
        this.timestamp = temps[this.timestampNum];
      } else {
        this.error = true;
        this.tempSolar = '---';
        this.tempWater = '---';
        // TODO: Letzter Versuch Text für Wertanfrage
      }
    });
  }

  updateTemps() {
    this.tempService.channel.bind('data-update-event', data => {
      this.error = false;
      this.tempSolar = data[this.solarNum].rawValue;
      this.tempWater = data[this.waterNum].rawValue;
      this.timestamp = data[this.timestampNum];
    });
  }

  ngOnInit() {
    this.showInitTemps();
  }

  ngAfterViewInit() {
    this.updateTemps();
  }
}
