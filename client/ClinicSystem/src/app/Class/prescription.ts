import { Medicine } from "./medicine";

export class Prescription {
    constructor(
        public doctor: string,
        public _id: string,
        public medicines: [
            {
                medicine: string,
                dose: string
            }
        ],
    ) { }
}
