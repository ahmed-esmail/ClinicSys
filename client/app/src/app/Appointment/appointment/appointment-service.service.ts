import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../../_models/appointment';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Doctor } from '../../_models/doctor';
import { Patient } from '../../_models/patient';
import { __param } from 'tslib';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { IPayment } from 'src/app/_models/IPayment';

@Injectable({
  providedIn: 'root',
})
export class appointmentService {
  private BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}
  docUrl: string = 'http://localhost:3000/doctors';
  patUrl: string = 'http://localhost:3000/patient';
  editable: Appointment = new Appointment('', '', '', '', '');
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/appointments`);
  }

  addAppointment(
    time: string,
    //bill: string,
    patient: string,
    doctor: string,
    condition: string
  ): Observable<Appointment> {
    return this.http
      .post<Appointment>(`${this.BASE_URL}/appointments`, {
        time,
        //bill,
        patient,
        doctor,
        condition,
      })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  getCurrentData(id: any):Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/appointments/${id}`);
  }

  editAppointment(id:any, app:any) {
    return this.http.put(`${this.BASE_URL}/appointments/${id}`, app);
  }

  addAppointmenttoDoctor(app: Appointment) {
    return this.http.put(
      'http://localhost:3000/doctors/addAppointmentToDoctor',
      { id: app.doctor, appointment: app._id }
    );
  }
  addAppointmenttoPatient(app: Appointment) {
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

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/appointments/${id}`);
  }

  deleteAppointmentfromDoctor(app: Appointment) {
    return this.http.put(this.docUrl + '/removeAppointmentFromDoctor', {
      id: app.doctor,
      appointment: app._id,
    });
  }

  deleteAppointmentfromPatient(app: Appointment) {
    return this.http.put(this.patUrl + '/deleteAppointmentfromPatient', {
      _id: app.patient,
      appointment: app._id,
    });
  }

  getDoctors() {
    return this.http.get<any[]>(this.docUrl);
  }

  getPayments() {
    return this.http.get<IPayment[]>(`${this.BASE_URL}/payments`);
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
