import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'temp-chart',
  styleUrls: ['./temp-chart.component.scss'],
  templateUrl: './temp-chart.component.html',
})

export class TempChartComponent implements OnDestroy {
  type = 'Tag';
  types = ['Tag', 'Woche', 'Jahr', 'Gesamt'];
  currentTheme: string;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}