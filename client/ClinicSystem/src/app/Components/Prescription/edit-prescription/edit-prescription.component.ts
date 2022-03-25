import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/Class/medicine';
import { Prescription } from 'src/app/Class/prescription';
import { PrescriptionService } from 'src/app/Services/prescription.service';
import { MedicineService } from 'src/app/Services/medicine.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-prescription',
  templateUrl: './edit-prescription.component.html',
  styleUrls: ['./edit-prescription.component.css'],
  providers: [DialogService]
})
export class EditPrescriptionComponent implements OnInit {

  constructor(private prescriptionService: PrescriptionService,
    public medicineService: MedicineService,
    public dynamicDialogRef: DynamicDialogRef,
    public dialogService: DialogService,
    public messageService: MessageService,
    private dynamicDialogConfig: DynamicDialogConfig,
    private confirmationService: ConfirmationService,
  ) {
  }

  medicines: Medicine[] = [];

  // id: string = "";
  
  med: string = "";
  dose: string = "";
  
  submitted: boolean = false;
  presDialog: boolean = false;
  isAdd: boolean = false;

  arr: [{ medicine: string, dose: string }] = [{ medicine: '', dose: '' }];
  prescription: Prescription = new
    Prescription('', new Date,'','', [{ medicine: "", dose: "" },]);

  ngOnInit(): void {
    console.log("pres");
    console.log(this.dynamicDialogConfig.data.pre);
    this.prescription = this.dynamicDialogConfig.data.pre;
    this.arr = this.prescription.medicines;
    this.presDialog = true;
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
    // this.prescription._id = this.prescriptionService.id;
    // this.prescriptionService.getprescription(this.prescriptionService.id).subscribe((res) => {
    //   this.prescription = res;
    //   this.arr = res.medicines;
    // });
  }
  add() {
    if (this.isAdd) {
      if (this.arr[0].medicine != "") {
        this.arr.push({ medicine: this.med, dose: this.dose });
      } else {
        this.arr[0] = { medicine: this.med, dose: this.dose };
      }
      this.reloadData();
      console.log(this.arr);
    } else {
      this.isAdd = true;
    }
  }
  delete(i : number) {
    this.confirmationService.confirm({

      message: 'Are you sure you want to delete ' + this.prescription._id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("in delete");
        console.log(i);
        this.arr.splice(i, 1);
        this.reloadData();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Medicine Deleted', life: 3000 });
      }
    });
  }

  edit() {
    console.log(this.prescription._id);
    this.presDialog = false;
    this.prescription.medicines = this.arr;

    this.prescriptionService.editprescription(this.prescription).subscribe((res) => {
      // this.medicines = res;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Prescription Updated', life: 3000 });

      this.hideDialog();
    });
  }
  // save() {
  //   this.presDialog = false;
  //   this.prescription.medicines = this.arr;
  //   console.log(this.prescription);
  //   this.prescriptionService.addprescription(this.prescription).subscribe(() => {
  //   });
  //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Prescription Added', life: 3000 });

  //   this.hideDialog();
  // }

  hideDialog() {
    this.presDialog = false;
    this.submitted = false;
    this.dynamicDialogRef.close();
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
