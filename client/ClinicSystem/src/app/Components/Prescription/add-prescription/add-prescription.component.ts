import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/Class/medicine';
import { Prescription } from 'src/app/Class/prescription';
import { PrescriptionService } from 'src/app/Services/prescription.service';
import { MedicineService } from 'src/app/Services/medicine.service';
// import { FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientService } from 'src/app/Services/patient.service';
import { Patient } from 'src/app/Class/patient';


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
  constructor(private prescriptionService: PrescriptionService,
    public medicineService: MedicineService,
    public patientService: PatientService,
    public ref: DynamicDialogRef,
    public messageService:MessageService
  ) {
  }

  medicines: Medicine[] = [];
  patients: Patient[] = [];

  med: string = "";
  dose: string = "";
  submitted: boolean = false;
  presDialog: boolean = false;
  
  arr: [{ medicine: string, dose: string }] = [{ medicine:'',dose:''}];
  prescription: Prescription = new
    Prescription('', new Date,'','', [{ medicine:"", dose: "" },]);
  
  ngOnInit(): void {
    this.presDialog = true;
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
    this.patientService.getpatients().subscribe((res) => {
      this.patients = res;
    });

  }
  add() {
    if (this.arr[0].medicine != "") {
      this.arr.push({medicine:this.med,dose: this.dose });
    } else {
      this.arr[0] = { medicine: this.med, dose: this.dose };
    }
    this.reloadData();
    console.log(this.arr);
  }

  save() {
    this.presDialog = false;
    this.submitted = true;
    this.prescription.medicines = this.arr;
    console.log(this.prescription);
    this.prescriptionService.addprescription(this.prescription).subscribe(() => {
    });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Prescription Added', life: 3000 });

    this.hideDialog();
  }

  hideDialog() {
    this.presDialog = false;
    this.submitted = false;
    this.ref.close();
  }

  reloadData() {
    // this.prescriptionService.getAllprescriptions().subscribe((res) => {
    //   this.prescriptions = res;
    // });
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }

}
