import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Dygraph from 'dygraphs';
import { PrecipitationService } from '../../services/precipitation.service';

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrls: ['./precipitation.component.scss']
})
export class PrecipitationComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: ElementRef;
  private sub: any;
  private dygraph: any;

  constructor(private route: ActivatedRoute, private precipitationService: PrecipitationService) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.precipitationService.changeDates(+params.start, +params.end);
    });
    this.precipitationService.precipitation.subscribe(temperatures => {
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
