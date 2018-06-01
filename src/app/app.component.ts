import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  years: number[] = [];
  startDate: number;
  endDate: number;

  constructor(private router: Router) {
    for (let i = 1881; i <= 2006; i++) {
      this.years.push(i);
    }
    this.startDate = 1881;
    this.endDate = 2006;
  }

  ngOnInit() {
    this.appendAQueryParam();
  }

  appendAQueryParam() {
    if (this.startDate <= this.endDate) {
      const urlTree = this.router.createUrlTree([], {
        queryParams: {
          start: this.startDate,
          end: this.endDate
        },
        queryParamsHandling: 'merge',
        preserveFragment: true
      });
      this.router.navigateByUrl(urlTree);
    }
  }

  isActive(instruction: any[]): boolean {
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }
}
