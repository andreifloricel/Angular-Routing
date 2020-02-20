import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';
import { EditRightsGuard } from './user/edit-rights.guard';
import { AnotherGuardGuard } from './user/another-guard.guard';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: 'welcome', component: WelcomeComponent, canLoad: [AuthGuard] },
        {
          path: 'products',
          // AFL
          // canActivate: [AuthGuard],

          // canLoad: [AuthGuard],

          data: { preload: false },
          loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
        },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent }
      ],
      // AFL
      {
        enableTracing: false,
        preloadingStrategy: PreloadAllModules
        // preloadingStrategy: SelectiveStrategy
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
