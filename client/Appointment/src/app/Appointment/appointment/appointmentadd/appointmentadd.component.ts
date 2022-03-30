import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { Appointment } from 'src/app/_models/appointment';
import { DatePipe } from '@angular/common';
import { appointmentService } from '../appointment-service.service';
import { Doctor } from 'src/app/_models/doctor';
import { Patient } from 'src/app/_models/patient';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-appointmentadd',
  templateUrl: './appointmentadd.component.html',
  styleUrls: ['./appointmentadd.component.css'],
})
export class AppointmentaddComponent implements OnInit {
  constructor(private appser: appointmentService, private dialog: MatDialog) {}

  nappointment: Appointment = new Appointment(
    '',
    new Date(),
    new Patient('', '', '', '', 10, '', '', ''),
    new Doctor(
      new User('', '', '', '', 10, '', '', '', 'Doctor', 'male', ''),
      '',
      [''],
      ['']
    ),
    ''
  );
  ngOnInit(): void {
    this.getDoctorsList();
    this.getPatientsList();
  }

  Doctors: User[] = [];
  getDoctorsList() {
    this.appser.getDoctors().subscribe({
      next: (response) => {
        this.Doctors = response;
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  Patients: Patient[] = [];
  getPatientsList() {
    this.appser.getPatients().subscribe({
      next: (response) => {
        this.Patients = response;
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  save() {
    this.appser.addAppointment(this.nappointment).subscribe({
      next: (response) => {
        console.log(response);
        this.appser.addAppointmenttoDoctor(response).subscribe({
          next: (response) => {
            this.dialog.closeAll();
          },
          error: (er) => {
            alert('Please insert Valid data');
          },
        });
        this.appser.addAppointmenttoPatient(response).subscribe({
          next: (response) => {
            this.dialog.closeAll();
          },
          error: (er) => {
            alert('Please insert Valid data');
          },
        });
        this.appser.addPatienttoDoctor(response).subscribe({
          next: (response) => {
            this.dialog.closeAll();
          },
          error: (er) => {
            alert('Please insert Valid data');
          },
        });
        this.appser.addDoctortoPatient(response).subscribe({
          next: (response) => {
            this.dialog.closeAll();
          },
          error: (er) => {
            alert('Please insert Valid data');
          },
        });
      },
      error: (er) => {
        alert('Please insert Valid data');
      },
    });
  }
}
