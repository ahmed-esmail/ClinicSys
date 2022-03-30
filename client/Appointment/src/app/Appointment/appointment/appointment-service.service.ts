import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../../_models/appointment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Doctor } from '../../_models/doctor';
import { Patient } from '../../_models/patient';
import { __param } from 'tslib';
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root',
})
export class appointmentService {
  constructor(public http: HttpClient) {}
  url: string = 'http://localhost:3000/appointments';
  docUrl: string = 'http://localhost:3000/doctors';
  patUrl: string = 'http://localhost:3000/patient';
  editable: Appointment = new Appointment(
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

  getAllAppointments() {
    return this.http.get<Appointment[]>(this.url);
  }

  addAppointment(app: Appointment) {
    return this.http.post(this.url, app);
  }

  editAppointment(app: Appointment) {
    return this.http.put(this.url, app);
  }

  addAppointmenttoDoctor(app: any) {
    return this.http.put(
      'http://localhost:3000/doctors/addAppointmentToDoctor',
      { id: app.doctor, appointment: app._id }
    );
  }
  addAppointmenttoPatient(app: any) {
    return this.http.put(
      'http://localhost:3000/patient/addAppointmenttoPatient',
      { _id: app.patient, appointment: app._id }
    );
  }

  addPatienttoDoctor(app: any) {
    return this.http.put('http://localhost:3000/doctors/addPatientToDoctor', {
      id: app.doctor,
      patient: app.patient,
    });
  }

  addDoctortoPatient(app: any) {
    return this.http.put('http://localhost:3000/patient/addDoctortoPatient', {
      _id: app.patient,
      doctor: app.doctor,
    });
  }

  deleteAppointment(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  deleteAppointmentfromDoctor(app: Appointment) {
    return this.http.put(this.docUrl + '/removeAppointmentFromDoctor', {
      id: app.doctor._id,
      appointment: app._id,
    });
  }

  deleteAppointmentfromPatient(app: Appointment) {
    return this.http.put(this.patUrl + '/deleteAppointmentfromPatient', {
      _id: app.patient._id,
      appointment: app._id,
    });
  }

  getDoctors() {
    return this.http.get<User[]>(this.docUrl);
  }

  getDoctorbyId(id: string) {
    return this.http.get<User>('http://localhost:3000/doctors' + '/' + id);
  }
  getPatients() {
    return this.http.get<Patient[]>(this.patUrl);
  }
  getPatientbyId(id: string) {
    return this.http.get<Patient>('http://localhost:3000/patient' + '/' + id);
  }
}
