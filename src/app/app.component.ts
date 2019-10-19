import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Linescandata} from "./linescandata";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  lineScanData: Observable<Linescandata>;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.lineScanData = this.http.get<Linescandata>('api');
  }
}
