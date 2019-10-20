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
  @ViewChild('myCanvas', {static: true}) canvasRef: ElementRef<HTMLCanvasElement>;

  urls: Url[][];
  linesScanDataSubscription: Subscription;
  mouseEventObservable: Observable<MouseEvent>;
  private startX: number;
  private startY: number;
  private h: number;
  private w: number;
  private drag: boolean = false;
  private mouseEventSubscription: Subscription;
  private ctx: CanvasRenderingContext2D;

  constructor() {
  }

  ngOnInit() {
    this.linesScanDataSubscription = this.lineScanData.subscribe(lineScanData => {
      this.urls = lineScanData.urls;
      this.linesScanDataSubscription.unsubscribe();
    });

    this.ctx = this.canvasRef.nativeElement.getContext("2d");
    /*ctx.moveTo(0, 0);
    ctx.lineTo(31.9, 63.2);
    ctx.lineTo(46.1, 186.3);*/

    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(0, 0, 500, 500);

    this.canvasRef.nativeElement.addEventListener('mousedown', this.mouseDown, false);
    this.canvasRef.nativeElement.addEventListener('mouseup', this.mouseUp, false);
    this.canvasRef.nativeElement.addEventListener('mousemove', this.mouseMove, false);

    /*fromEvent(ctx, "mousedown")
      .pipe(
        switchMap((e) => {
          return fromEvent(ctx, 'mousemove')
            .pipe(
              takeUntil(fromEvent(ctx, 'mouseup')),
              takeUntil(fromEvent(ctx, 'mouseleave')),
              pairwise()
            )
        })
      )*//*.subscribe((res: [MouseEvent, MouseEvent]) => {
      const rect = ctx.getBoundingClientRect();
      const prevPos = {
        x: res[0].clientX - rect.left,
        y: res[0].clientY - rect.top
      };

      const currentPos = {
        x: res[1].clientX - rect.left,
        y: res[1].clientY - rect.top
      };

      this.drawOnCanvas()
    });*/
      /*.subscribe(obv => {
        alert("Mouse")
      })*/

  }

  mouseDown = (event: MouseEvent): void => {
    this.startX = event.pageX - this.canvasRef.nativeElement.offsetLeft;
    this.startY = event.pageY - this.canvasRef.nativeElement.offsetTop;
    this.drag = true;
  };

  mouseUp = (event: MouseEvent): void => {
    this.drag = false;
    this.ctx.clearRect(0,0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

  };

  mouseMove = (event: MouseEvent): void => {
    if (this.drag) {
      this.w = (event.pageX - this.canvasRef.nativeElement.offsetLeft) - this.startX;
      this.h = (event.pageY - this.canvasRef.nativeElement.offsetTop) - this.startY;
      this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
      this.draw();
    }
  };

  draw = (): void => {
    this.ctx.setLineDash([6]);
    this.ctx.strokeRect(this.startX, this.startY, this.w, this.h);
  };

  ngOnDestroy(): void {
    // TODO: Unsubscribe from linescan data
    this.mouseEventSubscription.unsubscribe();
  }


}
