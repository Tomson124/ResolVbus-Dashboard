import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { SolarComponent } from './solar/solar.component';
import { WaterComponent } from './water/water.component';
import { TempChartComponent } from './temp-chart/temp-chart.component';
import { TempChartCodeComponent } from './temp-chart/temp-chart-code.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule
  ],
  declarations: [
    DashboardComponent,
    SolarComponent,
    WaterComponent,
    TempChartComponent,
    TempChartCodeComponent
  ],
})
export class DashboardModule { }
