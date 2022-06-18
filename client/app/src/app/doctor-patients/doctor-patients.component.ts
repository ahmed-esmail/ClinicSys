import {Component, OnInit} from '@angular/core';
import {Patient} from '../_models/patient';
import {PatientService} from '../patients/services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Table} from 'primeng/table';
import {DoctorService} from '../doctor.service';
import {Doctor} from '../_models/doctor';
import {zip} from "rxjs";

@Component({
  selector: 'app-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  styleUrls: ['./doctor-patients.component.css']
})
export class DoctorPatientsComponent implements OnInit {

  loading: boolean = true;
  patlist: Patient[] = [];
  doctor!: Doctor;
  imagePath: any;

  constructor(private patser: PatientService, private router: Router, private docSer: DoctorService, public ar: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ar.params.subscribe(a => {
      console.log(a['id'])
      this.docSer.getDoctorById(a['id']).subscribe({
        next: a => {
          this.doctor = a;
          this.doctor.patients.forEach(element => {
            this.patser.getPatientByID(element).subscribe({
              next: a => {
                this.patlist.push(a);
                this.loading = false;
                console.log(a)
              }
            })
          });
        }
      })
    })

  }

  clear(table: Table) {
    table.clear();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  detailsID(detpt: any): void {
    this.patser.detailsPatientID = detpt;
    this.router.navigate(['/patient/details']);
  }

}
