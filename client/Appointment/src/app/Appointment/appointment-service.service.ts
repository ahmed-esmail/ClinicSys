import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Doctor } from '../_models/doctor';
import { Patient } from '../_models/patient';

@Injectable({
  providedIn: 'root',
})
export class appointmentService {
  constructor(public http: HttpClient) {}
  url: string = 'http://localhost:3000/appointments';
  docUrl: string = 'http://localhost:3000/doctors';
  patUrl: string = 'http://localhost:3000/patient';
  getAllAppointments() {
    return this.http.get<Appointment[]>(this.url);
  }

  addAppointment(app: Appointment) {
    return this.http.post(this.url, app);
  }
  deleteAppointment(id: number) {
    return this.http.delete(this.url);
  }

  getDoctors() {
    return this.http.get<Doctor[]>(this.docUrl);
  }
  getPatients() {
    return this.http.get<Patient[]>(this.patUrl);
  }
}
