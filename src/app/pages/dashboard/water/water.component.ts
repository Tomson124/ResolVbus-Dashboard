import { Component, OnInit } from '@angular/core';
import { TempsService, Temps } from '@app/temps.service';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent implements OnInit {

  tempWater: number;
  timestamp: string;
  waterURL = 'tempWater';
  temps: Temps;
  constructor(private tempService: TempsService) {
    this.showTemp();
   }

  showTemp() {
    this.tempService.getTemp(this.waterURL)
      .subscribe(data => {
        this.tempWater = data.rawValue;
        this.timestamp = data.time;
      });
  }

  ngOnInit() {
  }

}
