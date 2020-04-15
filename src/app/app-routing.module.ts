import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },

            //implements lazy loading the assets module
            //assets wil not load on startup
            {
                path: 'assets2',
                canActivate: [AuthGuard],
                data: { preload: false },  //this route will use the preload strategy
                loadChildren: () =>
                    import('./asset/asset.module').then(m => m.AssetModule)
            },

            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ], { preloadingStrategy: SelectiveStrategy}
            // , { enableTracing: true }
        )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }