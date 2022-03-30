import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/_models/appointment';
import { Doctor } from 'src/app/_models/doctor';
import { Patient } from 'src/app/_models/patient';
import { User } from 'src/app/_models/user';
import { appointmentService } from '../appointment-service.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css'],
})
export class AppointmentEditComponent implements OnInit {
  constructor(public appser: appointmentService, private dialog: MatDialog) {}

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
  update(app: Appointment) {
    this.appser.editAppointment(app).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (er) => {
        alert('Please insert Valid data');
      },
    });
  }




}
