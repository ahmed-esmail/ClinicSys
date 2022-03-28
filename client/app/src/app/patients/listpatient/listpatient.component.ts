import {Component, OnInit, SecurityContext} from '@angular/core';
import {Patient} from '../models/patient';
import {PatientService} from '../services/patient.service';
import {Router} from '@angular/router';

import {Table} from 'primeng/table';
import {DomSanitizer} from '@angular/platform-browser';
import {join} from 'path';
import {PhoneNumberPipe} from 'src/app/phone-number.pipe';

@Component({
  selector: 'app-listpatient',
  templateUrl: './listpatient.component.html',
  styleUrls: ['./listpatient.component.css'],

})
export class ListpatientComponent implements OnInit {
  loading: boolean = true;
  patlist: Patient[] = [];
  imagePath: any;

  constructor(private patser: PatientService, private router: Router, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.patlist = this.patser.patientlist;
    this.patser.getpatients().subscribe(
      {
        next: a => {
          this.patser.patientlist = a;
          console.log(this.patser.patientlist);
          this.patlist = this.patser.patientlist;
          this.loading = false;
          ////////////////////   //
          console.log(this.patlist[6].profile_img)
          this.imagePath = this.displayImage(this.patlist[6].profile_img);


        }
      }
    );
    // (<any>$('#myModal')).modal('hide');

  }

  clear(table: Table) {
    table.clear();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  add(): void {

    this.router.navigate(['/patient/add']);
  }

  edit(editpt: any): void {
    this.patser.editePatientID = editpt;
    this.router.navigate(['/patient/edit']);
  }

  deleteID(delpt: any): void {

    (<any>$('#myModal')).modal('show');
    this.patser.deletePatientID = delpt;
    console.log(this.patser.deletePatientID);

  }

  delete(): void {
    this.router.navigate(['/patient/delete']);
    (<any>$('#myModal')).modal('hide');
  }

  detailsID(detpt: any): void {
    this.patser.detailsPatientID = detpt;
    this.router.navigate(['/patient/details']);
  }


  displayImage(imgBuffer: any) {
    console.log("image");

    if (imgBuffer != undefined) {
      let typed = new Uint8Array(this.toArrayBuffer(imgBuffer));
      const stringChar = String.fromCharCode.apply(null, [...typed]);
      let base64String = btoa(stringChar);
      // var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      // return this.sanitizer.bypassSecurityTrustUrl('data:image/svg+xml;charset=utf-8;base64, ' + base64String);
      return this.sanitizer.sanitize(SecurityContext.URL, 'data:image/png;base64, ' + base64String);
    }
    return null;
  }

  //convert buffer to arrayBuffer
  toArrayBuffer(buf: Buffer) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }


}
