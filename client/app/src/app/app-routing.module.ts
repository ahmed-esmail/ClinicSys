import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ReceptionistProfileComponent } from './receptionist-profile/receptionist-profile.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},

  {path:"doctors",loadChildren:()=>import("./doctor/doctor.module").then(m=>m.DoctorModule)},
  {path:"profile/doctor/:id",component:DoctorProfileComponent},
  
  {path:"receptionists",loadChildren:()=>import("./receptionist/receptionist.module").then(m=>m.ReceptionistModule)},
  {path:"profile/receptionist/:id",component:ReceptionistProfileComponent},

  {path:"**",component:ErrorComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.
    forRoot(routes)
  ],
  exports: [
    RouterModule, 
    CommonModule
  ]
})
export class AppRoutingModule { }
