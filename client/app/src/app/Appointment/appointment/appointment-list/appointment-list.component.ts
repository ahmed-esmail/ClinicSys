import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/_models/appointment';
import { appointmentService } from '../appointment-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/_models/patient';
import { Doctor } from 'src/app/_models/doctor';
import { mergeMap } from 'rxjs';
import { AppointmentaddComponent } from '../appointmentadd/appointmentadd.component';
import { AppointmentEditComponent } from '../appointment-edit/appointment-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  public loading = true;
  public errorMsg: string = '';
  public successMsg: string = '';
  public apps: any[] = [];
  public columns = ['time', 'patient', 'doctor', 'condition', 'operations'];

  constructor(
    private Appservice: appointmentService,
    private dialog: MatDialog,
    private errodilog: MatDialog,
    private router: Router
  ) {}
  ngOnInit() {
    this.Appservice.refreshNeeded$.subscribe(() => {
      this.getAll();
    });
    this.getAll();
  }

  private getAll() {
    this.Appservice.getAllAppointments().subscribe({
      next: (appointments: Appointment[]) => {
        console.log(appointments)
        this.apps = appointments;
        this.loading = false;
      },
      error: (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      },
    });
  }

  getDoctor(d: string): string {
    let out = '';
    console.log(d);

    this.Appservice.getDoctorbyId(d).subscribe({
      next: (response) => {
        console.log(response);

        out = response.firstName + ' ' + response.lastName;
      },
      error: (er) => {
        console.log(er);
      },
    });
    return out;
  }

  getPatient(d: string) {
    this.Appservice.getPatientbyId(d).subscribe({
      error: (er) => {
        console.log(er);
      },
    });
  }

  openAddForm() {
    this.dialog.open(AppointmentaddComponent, {
      width: '35%',
      height: '88%',
    });
  }

  openEditForm() {
    this.dialog.open(AppointmentEditComponent, {
      width: '35%',
      height: '88%',
    });
  }

  updateAppointment(app: Appointment) {
   this.router.navigate(['/updateAppointment/', app._id]);
    //this.openEditForm();
  }

   delete(app: Appointment) {
     this.Appservice.deleteAppointment(app._id)
       .pipe(mergeMap(() => this.Appservice.getAllAppointments()))
       .subscribe({
         next: (appointments: Appointment[]) => {
           this.apps = appointments;
           this.successMsg = 'Appointment Successfully deleted';
           this.Appservice.deleteAppointmentfromDoctor(app).subscribe({
             next: (response) => console.log('deleted from doctor'),
           });
           this.Appservice.deleteAppointmentfromPatient(app).subscribe({
             next: (response) => console.log('deleted from patient'),
           });
         },
         error: (error: ErrorEvent) => {
           this.errorMsg = error.error.message;
         },
       });
   }

}
