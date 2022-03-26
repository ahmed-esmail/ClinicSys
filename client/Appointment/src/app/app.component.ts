import { Component, OnInit } from '@angular/core';
import { appointmentService } from './Appointment/appointment-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}
  title = 'Appointment';
}
