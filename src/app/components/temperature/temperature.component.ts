import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import Dygraph from 'dygraphs';
import { ActivatedRoute } from '@angular/router';
import { TemperatureService } from '../../services/temperature.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: ElementRef;
  private sub: any;
  private dygraph: any;

  constructor(private route: ActivatedRoute, private temperatureService: TemperatureService) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.temperatureService.changeDates(+params.start, +params.end);
    });
    this.temperatureService.temperatures.subscribe(temperatures => {
      if (this.dygraph) {
        this.dygraph.updateOptions({ 'file': temperatures });
        this.dygraph.resetZoom();
      } else {
        this.dygraph = new Dygraph(this.chart.nativeElement, temperatures);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.dygraph) {
      this.dygraph.destroy();
      this.dygraph = null;
    }
  }

}
