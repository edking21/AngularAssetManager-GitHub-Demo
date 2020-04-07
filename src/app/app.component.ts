import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from './user/auth.service';
// import { slideInAnimation } './app.animation';

@Component({
  selector: "pm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
  // ,  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Asset Manager';
  loading = true;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}

