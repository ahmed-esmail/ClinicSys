import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {} from 'primeng';
import {RouterModule, Routes} from '@angular/router';
import {ListMedicinesComponent} from './Components/Medecine/list-medicines/list-medicines.component';
import {ListPrescriptionsComponent} from './Components/Prescription/list-prescriptions/list-prescriptions.component';
import {DoctorProfileComponent} from './doctor-profile/doctor-profile.component';
import {ErrorComponent} from './error/error.component';
import {HomeComponent} from './home/home.component';
import {ReceptionistProfileComponent} from './receptionist-profile/receptionist-profile.component';

import {ListpatientComponent} from './patients/listpatient/listpatient.component';
import {AuthGuard} from "./_helpers";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    // data: { roles: [Role.Admin] }
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)},

  {path: "doctors", loadChildren: () => import("./doctor/doctor.module").then(m => m.DoctorModule)},
  {path: "profile/doctor/:id", component: DoctorProfileComponent},

  {
    path: "receptionists",
    loadChildren: () => import("./receptionist/receptionist.module").then(m => m.ReceptionistModule)
  },
  {path: "profile/receptionist/:id", component: ReceptionistProfileComponent},

  {path: "prescriptions", component: ListPrescriptionsComponent},
  {path: "medicines", component: ListMedicinesComponent},
  {
    path: 'patient', loadChildren: () => import("./patients/patient.module").then(m => m.PatientModule)
  },


  {path: "**", component: ErrorComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    CommonModule
  ]
})
export class AppRoutingModule {
}
