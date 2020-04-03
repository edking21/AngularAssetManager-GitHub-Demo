import { Component, OnInit } from "@angular/core";
import { environment } from '../environments/environment';

@Component({
  selector: "pm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  userName: string;

  constructor() {
    console.log("Environment:", environment.serverPath)

  }
}

