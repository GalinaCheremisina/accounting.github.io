import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './store/app.reducers';
import { MessageEffects } from './store/message.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { environment } from '../environments/environment';
import { ErrorInterceptor } from './shared/components/error/error-interceptor';
import { AuthGuard } from './shared/services/auth-guard.service';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { MessageComponent } from './shared/components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomePageComponent,
    ErrorComponent,
    MessageComponent
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
    EffectsModule.forRoot([MessageEffects])
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [
    ErrorComponent,
    MessageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
