import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/_models/appointment';
import { appointmentService } from '../appointment-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/_models/patient';
import { Doctor } from 'src/app/_models/doctor';
import { AppointmentaddComponent } from '../appointmentadd/appointmentadd.component';
import { AppointmentEditComponent } from '../appointment-edit/appointment-edit.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  constructor(
    private Appservice: appointmentService,
    private dialog: MatDialog,
    private errodilog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAppointmentsList();
  }
  Appointments: Appointment[] = [];

  getAppointmentsList() {
    this.Appservice.getAllAppointments().subscribe({
      next: (response) => {
        this.Appointments = response;
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  getDoctor(d: string): string {
    let out = '';
    this.Appservice.getDoctorbyId(d).subscribe({
      next: (response) => {
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
      width: '60%',
      height: '80%',
    });
  }

  openEditForm() {
    this.dialog.open(AppointmentEditComponent, {
      width: '60%',
      height: '80%',
    });
  }

  updateAppointment(app: Appointment) {
    this.openEditForm();
    this.Appservice.editable = app;
  }

  delete(app: Appointment) {
    this.Appservice.deleteAppointment(app._id).subscribe({
      next: (response) => {
        this.deleteone(app._id);
        this.Appservice.deleteAppointmentfromDoctor(app).subscribe({
          next: (response) => console.log('deleted from doctor'),
        });
        this.Appservice.deleteAppointmentfromPatient(app).subscribe({
          next: (response) => console.log('deleted from patient'),
        });
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  deleteone(Id: string) {
    for (var i = 0; i < this.Appointments.length; i++) {
      if (this.Appointments[i]._id == Id) {
        this.Appointments.splice(i, 1);
        break;
      }
    }
  }
}
