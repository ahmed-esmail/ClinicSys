import { Time } from '@angular/common';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';

export class Patient {
  constructor(
    public _id: string,
    public first_name: String,
    public last_name: String,
    public phone_number: string,
    public age: number,
    public gender: string,
    public address: string,
    public history: string[],
    public Doctor: any[],
    public Appointment: any[],
    public Prescriptions: any[]
  ) {}
}
