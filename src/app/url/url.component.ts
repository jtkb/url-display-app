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
  mouseEventObservable: Observable<MouseEvent>;
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

    this.layer1.nativeElement.addEventListener('mousedown', this.mouseDown, false);
    this.layer1.nativeElement.addEventListener('mouseup', this.mouseUp, false);
    this.layer1.nativeElement.addEventListener('mousemove', this.mouseMove, false);

  }

  mouseDown = (event: MouseEvent): void => {
    this.startX = event.offsetX; // - this.layer1.nativeElement.offsetLeft;
    this.startY = event.offsetY; // - this.layer1.nativeElement.offsetTop;
    this.drag = true;
  };

  mouseUp = (event: MouseEvent): void => {
    this.drag = false;
    this.ctx1.clearRect(0,0, this.layer1.nativeElement.width, this.layer1.nativeElement.height);

  };

  mouseMove = (event: MouseEvent): void => {
    if (this.drag) {
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
