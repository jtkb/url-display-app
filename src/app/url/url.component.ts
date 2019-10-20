import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('layer0', {static: true}) layer0: ElementRef<HTMLCanvasElement>;
  @ViewChild('layer1', {static: true}) layer1: ElementRef<HTMLCanvasElement>;

  urls: Url[][];
  linesScanDataSubscription: Subscription;
  private startX: number;
  private startY: number;
  private h: number;
  private w: number;
  private drag: boolean = false;
  private mouseEventSubscription: Subscription;
  private ctx0: CanvasRenderingContext2D;
  private ctx1: CanvasRenderingContext2D;

  constructor() {
  }

  ngOnInit() {
    this.linesScanDataSubscription = this.lineScanData.subscribe(lineScanData => {
      this.urls = lineScanData.urls;
      this.linesScanDataSubscription.unsubscribe();
    });

    this.ctx0 = this.layer0.nativeElement.getContext("2d");
    this.ctx1 = this.layer1.nativeElement.getContext("2d");

    this.ctx0.fillStyle = "#FF0000";
    this.ctx0.fillRect(0, 0, 500, 500);

    this.layer1.nativeElement.addEventListener('mousedown', this.mouseDownHandler, false);
    this.layer1.nativeElement.addEventListener('mouseup', this.mouseUpHandler, false);
    this.layer1.nativeElement.addEventListener('mousemove', this.mouseMoveHandler, false);

  }

  mouseDownHandler = (event: MouseEvent): void => {
    this.startX = event.offsetX;
    this.startY = event.offsetY;
    this.drag = true;
  };

  mouseUpHandler = (event: MouseEvent): void => {
    this.drag = false;
    this.ctx1.clearRect(0, 0, this.layer1.nativeElement.width, this.layer1.nativeElement.height);

    if (this.w > 0 && this.h > 0) {
      this.ctx0.setLineDash([]);
      this.ctx0.strokeStyle = 'blue';
      this.ctx0.strokeRect(this.startX, this.startY, this.w, this.h);
      this.w = 0;
      this.h = 0;
    }

  };

  mouseMoveHandler = (event: MouseEvent): void => {
    if (this.drag) {
      this.drag = true;
      this.w = event.offsetX - this.startX;
      this.h = event.offsetY - this.startY;
      this.ctx1.clearRect(0, 0, this.layer1.nativeElement.width, this.layer1.nativeElement.height);
      this.draw();
    }
  };

  draw = (): void => {
    this.ctx1.setLineDash([6]);
    this.ctx1.strokeRect(this.startX, this.startY, this.w, this.h);
  };

  ngOnDestroy(): void {
    // TODO: Unsubscribe from linescan data
    this.mouseEventSubscription.unsubscribe();
  }


}
