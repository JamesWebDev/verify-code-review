import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { VerifyCodeReviewsComponent } from './verify-code-reviews/verify-code-reviews.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule, 
  MatCheckboxModule, 
  MatFormFieldModule, 
  MatCardModule, 
  MatInputModule,
  MatTableModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports:      [ 
    HttpClientModule,BrowserAnimationsModule,
    BrowserModule, FormsModule,
    MatButtonModule, MatCheckboxModule, 
    MatFormFieldModule,  MatSelectModule,
    MatCardModule, MatInputModule,
    MatTableModule
  ],
  declarations: [ AppComponent, HelloComponent, VerifyCodeReviewsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
