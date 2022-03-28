import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {Patient} from 'src/app/_models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public http: HttpClient) {

  }

  private baseUrl: string = "http://localhost:3000/patient"
  public patientlist: Patient[] = [];
  public deletePatientID: any;
  public editePatientID: any;
  public detailsPatientID: any;

  getpatients() {
    return this.http.get<Patient[]>(this.baseUrl);

  }

  getPatientByID(_id: any) {

    return this.http.get<Patient>(this.baseUrl + "/" + _id);

  }

  deletePatient(_id: any) {

    return this.http.delete(this.baseUrl + "/" + _id);
  }

  addPatient(st: Patient) {
    console.log(st);
    return this.http.post<Patient>(this.baseUrl, st)
  }

  updatePatient(pt: Patient) {
    return this.http.put(this.baseUrl, pt)
  }
}
