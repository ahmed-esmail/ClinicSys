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
import { IPayment } from 'src/app/_models/IPayment';

@Component({
  selector: 'app-appointmentadd',
  templateUrl: './appointmentadd.component.html',
  styleUrls: ['./appointmentadd.component.css'],
})
export class AppointmentaddComponent implements OnInit {
  public successMsg: string = '';
  public errorMsg: string = '';

  public time: string = '';
  public patient: string = '';
  public doctor: string = '';
  public condition: string = '';
  //public bill: string = '';

  constructor(private appser: appointmentService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getDoctorsList();
    this.getPatientsList();
    // this.getBills();
  }

  Doctors: any[] = [];
  getDoctorsList() {
    this.appser.getDoctors().subscribe({
      next: (response) => {
        console.log(response)
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

  // Bills: IPayment[] = [];
  // getBills() {
  //   this.appser.getPayments().subscribe({
  //     next: (response) => {
  //       this.Bills = response;
  //     },
  //     error: (er) => {
  //       console.log(er);
  //     },
  //   });
  // }

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.appser
      .addAppointment(
        this.time,
        this.patient,
        this.doctor,
        this.condition,
        //this.bill,
      )
      .subscribe({
        next: (createdAppointment: Appointment) => {
          this.time = '';
          this.patient = '';
          this.doctor = '';
          this.condition = '';
          //this.bill = '';
          const appointmentTime = new Date(
            createdAppointment.time
          ).toDateString();
          this.successMsg = `Appointment Booked successfully for ${appointmentTime}`;
          this.appser.addAppointmenttoDoctor(createdAppointment).subscribe({
            next: (a) => {
              console.log('Appointment added to doctor');
            },
            error: (error: ErrorEvent) => {
              this.errorMsg = error.error.message;
            },
          });
          this.appser.addAppointmenttoPatient(createdAppointment).subscribe({
            next: (a) => {
              console.log('Appointment added to patient');
            },
            error: (error: ErrorEvent) => {
              this.errorMsg = error.error.message;
            },
          });
          this.appser.addPatienttoDoctor(createdAppointment).subscribe({
            next: (a) => {
              console.log('Patient added to doctor');
            },
            error: (error: ErrorEvent) => {
              this.errorMsg = error.error.message;
            },
          });
          this.appser.addDoctortoPatient(createdAppointment).subscribe({
            next: (a) => {
              console.log('Doctor added to patient');
            },
            error: (error: ErrorEvent) => {
              this.errorMsg = error.error.message;
            },
          });
          this.dialog.closeAll();
        },
        error: (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        },
      });
  }

  // save() {
  //   this.appser.addAppointment(this.nappointment).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       this.appser.addAppointmenttoDoctor(response).subscribe({
  //         next: (response) => {
  //           this.dialog.closeAll();
  //         },
  //         error: (er) => {
  //           alert('Please insert Valid data');
  //         },
  //       });
  //       this.appser.addAppointmenttoPatient(response).subscribe({
  //         next: (response) => {
  //           this.dialog.closeAll();
  //         },
  //         error: (er) => {
  //           alert('Please insert Valid data');
  //         },
  //       });
  //       this.appser.addPatienttoDoctor(response).subscribe({
  //         next: (response) => {
  //           this.dialog.closeAll();
  //         },
  //         error: (er) => {
  //           alert('Please insert Valid data');
  //         },
  //       });
  //       this.appser.addDoctortoPatient(response).subscribe({
  //         next: (response) => {
  //           this.dialog.closeAll();
  //         },
  //         error: (er) => {
  //           alert('Please insert Valid data');
  //         },
  //       });
  //     },
  //     error: (er) => {
  //       alert('Please insert Valid data');
  //     },
  //   });
  // }
}
