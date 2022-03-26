import { NgModule } from '@angular/core';
import{} from 'primeng';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListpatientComponent } from './patients/listpatient/listpatient.component';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  
  
    {
      path: 'Home', component:HomeComponent
      
      }
      ,
     
  {  path:'patient',loadChildren:()=>import("./patients/patient.module").then(m=>m.PatientModule  )              
    },{
    path:"**",component:HomeComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ,CommonModule] ,
  exports: [RouterModule,CommonModule]
})
export class AppRoutingModule { }
