import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { Appointment } from 'src/app/_models/appointment';
import { DatePipe } from '@angular/common';
import { appointmentService } from '../appointment-service.service';
import { Doctor } from 'src/app/_models/doctor';
import { Patient } from 'src/app/_models/patient';

@Component({
  selector: 'app-appointmentadd',
  templateUrl: './appointmentadd.component.html',
  styleUrls: ['./appointmentadd.component.css'],
})
export class AppointmentaddComponent implements OnInit {
  constructor(private appser: appointmentService) {}

  nappointment: Appointment = new Appointment('', new Date(), '', '', '');
  ngOnInit(): void {
    this.getDoctorsList();
    this.getPatientsList();
  }
  Doctors: Doctor[] = [];
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
        alert(response + 'is saved');
        console.log(response);
        this.appser.addAppointmenttoDoctor(response).subscribe({
          next: (response) => {
            alert(response + 'is saved');
          },
          error: (er) => {
            console.log(er);
          },
        });
        this.appser.addAppointmenttoPatient(response).subscribe({
          next: (response) => {
            alert(response + 'is saved');
          },
          error: (er) => {
            console.log(er);
          },
        });
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
}
