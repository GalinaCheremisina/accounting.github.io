import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SelectivePreloadingStrategyService } from './shared/services/selective-preloading-strategy.service';

const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'auth', loadChildren:'./auth/auth.module#AuthModule', data: { preload: true }},
  {path:'system', loadChildren:'./system/system.module#SystemModule'},
  {path:'**', component: NotFoundComponent}
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes,{preloadingStrategy: SelectivePreloadingStrategyService})
   // RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})
  ],
 // providers: [SelectivePreloadingStrategyService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
