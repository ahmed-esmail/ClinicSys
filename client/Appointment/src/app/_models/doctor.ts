import { Time } from '@angular/common';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { User } from "./user";



export class Doctor {
    
    constructor(public _id:User,
        public speciality:string, 
        public appointments:string[], 
        public patients:string[]) {
    }

}
