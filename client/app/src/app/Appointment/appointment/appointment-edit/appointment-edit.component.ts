import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/_models/appointment';
import { Doctor } from 'src/app/_models/doctor';
import { Patient } from 'src/app/_models/patient';
import { User } from 'src/app/_models/user';
import { appointmentService } from '../appointment-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css'],
})
export class AppointmentEditComponent implements OnInit {
  public successMsg: string = '';
  public errorMsg: string = '';
  alert: boolean = false;
  appToUpdate = new FormGroup({
    //id:'',
    time: new FormControl(''),
    patient: new FormControl(''),
    doctor: new FormControl(''),
    condition: new FormControl(''),
    //bill:
  });

  constructor(
    public appser: appointmentService,
    private dialog: MatDialog,
    private arouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDoctorsList();
    this.getPatientsList();
    console.log(this.arouter.snapshot.paramMap.get('id'));
    this.appser
      .getCurrentData(this.arouter.snapshot.paramMap.get('id'))
      .subscribe((result) => {
        this.appToUpdate = new FormGroup({
          //id:'',
          time: new FormControl(result['time']),
          patient: new FormControl(result['patient']),
          doctor: new FormControl(result['doctor']),
          condition: new FormControl(result['condition']),
          //bill:
        });
      });
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

  Update() {
    this.appser
      .editAppointment(
        this.arouter.snapshot.paramMap.get('id'),
        this.appToUpdate.value
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.successMsg = 'Appointment updated successfully';
          this.router.navigate(['appointments']);
          this.dialog.closeAll();
        },
        error: (er) => {
          alert('Please insert Valid data');
        },
      });
  }
}
