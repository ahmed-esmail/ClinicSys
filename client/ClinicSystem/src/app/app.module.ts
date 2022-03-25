import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';

import { ListMedicinesComponent } from './Components/Medecine/list-medicines/list-medicines.component';
import { AddMedicineComponent } from './Components/Medecine/add-medicine/add-medicine.component';
import { EditMedicineComponent } from './Components/Medecine/edit-medicine/edit-medicine.component';
import { RemoveMedicineComponent } from './Components/Medecine/remove-medicine/remove-medicine.component';
import { RemovePrescriptionComponent } from './Components/Prescription/remove-prescription/remove-prescription.component';
import { AddPrescriptionComponent } from './Components/Prescription/add-prescription/add-prescription.component';
import { EditPrescriptionComponent } from './Components/Prescription/edit-prescription/edit-prescription.component';
import { ListPrescriptionsComponent } from './Components/Prescription/list-prescriptions/list-prescriptions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    AppComponent,
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    TabViewModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ListboxModule,
    CheckboxModule,
    ListboxModule,
    DropdownModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule, 
    InputTextModule,
    ToastModule,
    DynamicDialogModule
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
