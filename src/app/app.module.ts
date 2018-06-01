import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { PrecipitationComponent } from './components/precipitation/precipitation.component';
import { TemperatureService } from './services/temperature.service';
import { PrecipitationService } from './services/precipitation.service';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    PrecipitationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    RouterModule.forRoot([
      {
        path: 'temperature',
        component: TemperatureComponent
      },
      {
        path: 'precipitation',
        component: PrecipitationComponent
      },
      {
        path: '**',
        redirectTo: 'temperature'
      }
    ])
  ],
  providers: [TemperatureService, PrecipitationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
