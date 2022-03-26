import { Time } from '@angular/common';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';

export class Appointment {
  constructor(
    public _id: number,
    public date: Date,
    public time: Time,
    public bill: String,
    public patient: string,
    public doctor: String,
    public condition: String
  ) {}
}
