import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},

  {path:"doctors",loadChildren:()=>import("./doctor/doctor.module").then(m=>m.DoctorModule)},
  
  {path:"receptionists",loadChildren:()=>import("./receptionist/receptionist.module").then(m=>m.ReceptionistModule)},

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
