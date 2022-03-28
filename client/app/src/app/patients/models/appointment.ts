import { Time } from '@angular/common';
import { not } from '@angular/compiler/src/output/output_ast';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { Optional } from '@angular/core';

export class Appointment {
  constructor(
    public _id: string,
    public time: Date,
    public patient: string,
    public doctor: string,
    public condition: string,
    public bill ?: string ,
    
  ) {}
}