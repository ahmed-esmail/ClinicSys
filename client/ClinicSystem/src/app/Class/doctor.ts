import { User } from "src/app/Class/user";

export class Doctor {
    
    constructor(public _id:User,
        public speciality:string, 
        public appointments:string[], 
        public patients:string[]) {
    }

}
