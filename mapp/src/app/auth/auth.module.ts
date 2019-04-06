import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthRoutingModule } from './auth-routing.module';
import { authReducer } from './store/auth.reducers';
import { AuthEffects } from './store/auth.effects';

@NgModule({ 
    declarations:[
        AuthComponent,
        AuthFormComponent
    ],
    imports:[
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([AuthEffects])
    ]
})
export class AuthModule{}