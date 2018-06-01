import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TemperatureService implements OnDestroy {
  private woker: any;
  temperatures: Observable<any>;
  private updateSubject = new Subject<any>();

  constructor(private httpClient: HttpClient) {
    this.temperatures = this.updateSubject.asObservable();
    this.woker = new Worker('assets/temperature-worker.js');
    this.woker.onmessage = (e) => {
      this.updateSubject.next(e.data);
    };
  }

  changeDates(startDate, endDate) {
    this.woker.postMessage([startDate, endDate]);
  }

  ngOnDestroy() {
    this.woker.terminate();
  }
}
