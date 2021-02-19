import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { SignupService } from './signup/signup.service';

@NgModule({
    declarations: [
        HomeComponent,
        SignInComponent,
        SignUpComponent
     ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule,
     ],
     providers: [
         SignupService
     ]
})
export class HomeModule { }
