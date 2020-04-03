import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AssetData } from './asset/asset-data';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { environment } from '../environments/environment';

/* Feature Modules */
import { AssetModule } from './asset/asset.module';
import { fromEventPattern } from 'rxjs';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
    environment.production ? [] :
    InMemoryWebApiModule.forRoot(AssetData, {
      dataEncapsulation: false,
      delay: 1000,
      passThruUnknownUrl: true }),
    AssetModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
