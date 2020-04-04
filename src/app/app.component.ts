import { Component, OnInit } from "@angular/core";
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: "pm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  constructor(
    private router: Router) {
    console.log("Environment:", environment.serverPath)
  }
}

