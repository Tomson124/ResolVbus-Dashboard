import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SolarComponent } from './pages/dashboard/solar/solar.component';
import { TempsService } from './temps.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    SolarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [TempsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
