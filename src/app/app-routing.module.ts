import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            
            //implements lazy loading the assets module
            //assets wil not load on startup
            {
                path: 'assets2',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import('./asset/asset.module').then(m => m.AssetModule)
            },
            
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ]
            // , { enableTracing: true }
        )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }