import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DoctorService } from './doctor.service';
import { ReceptionistService } from './receptionist.service';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceptionistProfileComponent } from './receptionist-profile/receptionist-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    DoctorProfileComponent,
    ReceptionistProfileComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    FileUploadModule,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  providers: [DoctorService, ReceptionistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
