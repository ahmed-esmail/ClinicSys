import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/_models/appointment';
import { appointmentService } from '../appointment-service.service';
import { AppointmentaddComponent } from '../appointmentadd/appointmentadd.component';
import { MatDialog } from '@angular/material/dialog';

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
  openAddForm() {
    this.dialog.open(AppointmentaddComponent, {
      width: '50%',
      height: '70%',
    });
  }
}
