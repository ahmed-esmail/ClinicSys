import { Component, OnInit } from '@angular/core';
import { Prescription } from 'src/app/Class/prescription';
import { PrescriptionService } from 'src/app/Services/prescription.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MedicineService } from 'src/app/Services/medicine.service';
import { Medicine } from 'src/app/Class/medicine';
import { DialogService } from 'primeng/dynamicdialog';
import { AddMedicineComponent } from '../../Medecine/add-medicine/add-medicine.component';
import { AddPrescriptionComponent } from '../add-prescription/add-prescription.component';
import { EditPrescriptionComponent } from '../edit-prescription/edit-prescription.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';





@Component({
  selector: 'app-list-prescriptions',
  templateUrl: './list-prescriptions.component.html',
  styles: [`
         :host ::ng-deep .p-dialog  {
             width: 150px;
             margin: 0 auto 2rem auto;
             display: block;
         }
     `],
  providers: [MessageService, ConfirmationService,DialogService]
})

export class ListPrescriptionsComponent implements OnInit {
  
  prescriptions: Prescription[] = [];
  medicines: Medicine[] = [];

  prescription: Prescription = new Prescription('', new Date,'','', [{ medicine: "", dose: "" },]);
  
  med: string = "";
  dose: string = "";

  presDialog: boolean = false;
  submitted: boolean = false;
  isEdit: boolean = false;
 
  arr: [{ medicine: string, dose: string }] = [{ medicine: '', dose: '' }];

  constructor(public prescriptionService: PrescriptionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private medicineService: MedicineService,
    private dialogService: DialogService,
  ) {
    
  }

  ngOnInit(): void {
    this.prescriptionService.getAllprescriptions().subscribe((res) => {
      this.prescriptions = res;
    });
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }

  showAdd() {
    const ref = this.dialogService.open(AddPrescriptionComponent, {
      header: 'Add Prescription',
      width: '70%'
    });

    ref.onClose.subscribe(() => {
      this.reloadData();
    });
  }

  showEdit(pres: Prescription) {
    const ref = this.dialogService.open(EditPrescriptionComponent, {
      data: {
        pre: pres,
      },
      header: 'Edit prescription',
      width: '70%'
    });

    ref.onClose.subscribe(() => {
      this.reloadData();
    });
  }

  clickEdit(pres: Prescription) {
    // this.prescriptionService.id = i;
    this.isEdit = true;
    this.prescription = { ...pres };
    this.submitted = false;
    this.presDialog = true;
  }

  clickAdd() {
    this.isEdit = false;
    this.prescription = new Prescription('', new Date,'','', [{ medicine: "", dose: "" },]);
    this.submitted = false;
    this.presDialog = true;
  }

  clickDelete(i: string) {

    this.prescriptionService.id = i;

    console.log("in delete");

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.prescription._id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("in accept");
        this.prescriptionService.deleteprescription(this.prescriptionService.id).subscribe(() => {
        });;
        // this.products = this.products.filter(val => val.id !== product.id);
        // this.product = {};
        this.reloadData();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Prescription Deleted', life: 3000 });
      }
    });

  }

  add() {
    if (this.arr[0].medicine != "") {
      this.arr.push({ medicine: this.med, dose: this.dose });
    } else {
      this.arr[0] = { medicine: this.med, dose: this.dose };
    }
    this.reloadData();
    console.log(this.arr);
  }

  save() {
    console.log(this.prescription);
    if (this.isEdit) {
      // this.medicines[this.findIndexById(this.medicine._id)] = this.medicine;
      this.prescriptionService.editprescription(this.prescription).subscribe(() => {
      });;
    } else {
      // this.medicines.push(this.medicine); 
      this.prescription.medicines = this.arr;
      this.prescriptionService.addprescription(this.prescription).subscribe(() => {
      });
      
    }
    this.reloadData();
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Prescription Updated', life: 3000 });
    this.presDialog = false;
    // this.prescription.medicines = this.arr;
    // console.log(this.prescription);
    // this.prescriptionService.addprescription(this.prescription).subscribe(() => {
    // });
  }

  hideDialog() {
    this.presDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.prescriptions.length; i++) {
      if (this.prescriptions[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  reloadData() {
    this.prescriptionService.getAllprescriptions().subscribe((res) => {
      this.prescriptions = res;
    });
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }
}