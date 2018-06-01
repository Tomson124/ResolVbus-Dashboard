import { Component, OnInit, Input } from '@angular/core';
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
  tempSolar: number;
  tempWater: number;
  timestamp: string;

  temps: Temps;

  constructor(private route: ActivatedRoute) { }

  showTemps() {
    this.route.data.subscribe(( { temps }) => {
      this.temps = temps;
    });
    this.tempSolar = this.temps[this.solarNum].rawValue;
    this.tempWater = this.temps[this.waterNum].rawValue;
    this.timestamp = this.temps[this.solarNum].time;
  }

  ngOnInit() {
    this.showTemps();
  }
}
