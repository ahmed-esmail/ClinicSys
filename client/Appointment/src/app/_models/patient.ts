import { Time } from '@angular/common';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';

export class Patient {
  constructor(
    public _id: string,
    public first_name: string,
    public last_name: string,
    public phone_number: string,
    public age: number,
    public address: string,
    public gender: string,
    public profile_img: string | any
  ) // ,public Doctor:Doctor[],public Appointment:Appointment[],public Prescription:Prescription[]
  {}
}
