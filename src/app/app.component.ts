import { Component, OnInit } from "@angular/core";
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './user/auth.service';

@Component({
  selector: "pm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}

