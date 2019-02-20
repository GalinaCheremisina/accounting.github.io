import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { reducers } from './store/app.reducers';
import { environment } from '../environments/environment';
import { AuthEffects } from './auth/store/auth.effects';
import { ErrorInterceptor } from './shared/components/error/error-interceptor';
import { AuthGuard } from './auth/auth-guard.service';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrorComponent } from './shared/components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomePageComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,    
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() :[],
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  entryComponents: [ErrorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
