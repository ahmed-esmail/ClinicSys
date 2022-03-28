import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DoctorService } from './doctor.service';
import { ReceptionistService } from './receptionist.service';
import { AddpatientComponent } from './patients/addpatient/addpatient.component';
import { ListpatientComponent } from './patients/listpatient/listpatient.component';
import {  EditpatientComponent } from './patients/editpatient/editpatient.component';
import { DeletepatientComponent } from './patients/deletepatient/deletepatient.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';

import { ListMedicinesComponent } from './Components/Medecine/list-medicines/list-medicines.component';
import { AddMedicineComponent } from './Components/Medecine/add-medicine/add-medicine.component';
import { EditMedicineComponent } from './Components/Medecine/edit-medicine/edit-medicine.component';
import { RemoveMedicineComponent } from './Components/Medecine/remove-medicine/remove-medicine.component';
import { RemovePrescriptionComponent } from './Components/Prescription/remove-prescription/remove-prescription.component';
import { AddPrescriptionComponent } from './Components/Prescription/add-prescription/add-prescription.component';
import { EditPrescriptionComponent } from './Components/Prescription/edit-prescription/edit-prescription.component';
import { ListPrescriptionsComponent } from './Components/Prescription/list-prescriptions/list-prescriptions.component';


import { DetailspatientComponent } from './patients/detailspatient/detailspatient.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceptionistProfileComponent } from './receptionist-profile/receptionist-profile.component';

import { BrowserModule } from '@angular/platform-browser';
// import { DataTablesModule } from 'angular-datatables';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { TabViewModule } from 'primeng/tabview';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';


import { TooltipModule } from 'primeng/tooltip';
import "@angular/compiler";
import { PhoneNumberPipe } from './phone-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    DoctorProfileComponent,
    ReceptionistProfileComponent,
    AddpatientComponent,
    ListpatientComponent,
    EditpatientComponent,
    DeletepatientComponent,
    PhoneNumberPipe,
    DetailspatientComponent,

    ListMedicinesComponent,
    AddMedicineComponent,
    EditMedicineComponent,
    RemoveMedicineComponent,

    RemovePrescriptionComponent,
    AddPrescriptionComponent,
    EditPrescriptionComponent,
    ListPrescriptionsComponent,
  ],
  imports: [
    AppRoutingModule,

    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,

    CoreModule,
    CalendarModule,
    ConfirmDialogModule,

    DialogModule,
    DynamicDialogModule,
    DropdownModule,

    FormsModule,
    FileUploadModule,
    FormsModule,

    HttpClientModule,
 
    InputTextModule,
    InputNumberModule,

    ReactiveFormsModule,

    TableModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
   
    // ListboxModule,
    // CheckboxModule,
    // ListboxModule,

    FileUploadModule,
    InputNumberModule,
    TooltipModule
    
  ],
  providers: [DoctorService, ReceptionistService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
