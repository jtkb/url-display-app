import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs/index";
import {Linescandata} from "../linescandata";
import {Url} from "../url";

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit, OnDestroy {


  @Input() lineScanData: Observable<Linescandata>;
  @Input() scanIndex: number;
  urls: Url[][];
  linesScanDataSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.linesScanDataSubscription = this.lineScanData.subscribe(lineScanData => {
      this.urls = lineScanData.urls;
      this.linesScanDataSubscription.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    // TODO: Unsubscribe from linescan data
    //this.linesScanDataSubscription.unsubscribe();
  }

}
