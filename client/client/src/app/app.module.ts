import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddpatientComponent } from './patients/addpatient/addpatient.component';
import { ListpatientComponent } from './patients/listpatient/listpatient.component';
import {  EditpatientComponent } from './patients/editpatient/editpatient.component';
import { DeletepatientComponent } from './patients/deletepatient/deletepatient.component';
import { HomeComponent } from './home/home.component';
import { DetailspatientComponent } from './patients/detailspatient/detailspatient.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { TooltipModule } from 'primeng/tooltip';
import "@angular/compiler";
import { PhoneNumberPipe } from './phone-number.pipe';

@NgModule({
  declarations: [
    AppComponent,AddpatientComponent,
    ListpatientComponent,   EditpatientComponent, DeletepatientComponent, HomeComponent, PhoneNumberPipe,
    DetailspatientComponent

  
  ],
  imports: [
 FormsModule,BrowserAnimationsModule,ReactiveFormsModule,
     AppRoutingModule,HttpClientModule ,  TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    FileUploadModule,
    InputNumberModule,TooltipModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
