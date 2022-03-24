import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/Class/medicine';
import { Prescription } from 'src/app/Class/prescription';
import { PrescriptionService } from 'src/app/Services/prescription.service';
import { MedicineService } from 'src/app/Services/medicine.service';
// import { FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styles: [`
         :host ::ng-deep .p-dialog {
             width: 150px;
             margin: 0 auto 2rem auto;
             display: block;
         }
     `],
     
})
export class AddPrescriptionComponent implements OnInit {

  //service of doctors
  constructor(private prescriptionService: PrescriptionService, public medicineService: MedicineService) {

  }

  medicines: Medicine[] = [];
   //array of doctors

  med: string = "";
  dose: string = "";
  submitted: boolean = false;
  presDialog: boolean = false;
  
  arr: [{ medicine: string, dose: string }] = [{ medicine:'',dose:''}];
  newPrescription: Prescription = new
    Prescription('', '', [{ medicine:"", dose: "" },]);
  
  ngOnInit(): void {
    this.presDialog = true;
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });

  }
  add() {
    if (this.arr[0].medicine != "") {
      this.arr.push({medicine:this.med,dose: this.dose });
    } else {
      this.arr[0] = { medicine: this.med, dose: this.dose };
    }
    
    console.log(this.arr);
  }

  save() {
    this.presDialog = false;
    this.newPrescription.medicines = this.arr;
    console.log(this.newPrescription);
    this.prescriptionService.addprescription(this.newPrescription).subscribe(() => {
    });
  }
}
