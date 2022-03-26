import { Time } from '@angular/common';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';

export class Doctor {
  constructor(
    public _id: number,
    public first_name: string,
    public last_name: string,
    public phoneNumber: string,
    public age: Number,
    public address: string,
    public email: string,
    public type: string,
    public gender: string,
    public password: string,
    public tokens: any[]
  ) {}
}
