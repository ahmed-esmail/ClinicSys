<<<<<<< HEAD
import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Medicine } from 'src/app/_models/medicine';
import { MedicineService } from 'src/app/Services/medicine.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
=======
import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Medicine} from 'src/app/_models/medicine';
import {MedicineService} from 'src/app/Services/medicine.service';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
>>>>>>> ea7f11bb018470f0aca29433870bf55fd2250097

@Component({
  selector: 'app-list-medicines',
  templateUrl: './list-medicines.component.html',
  styles: [`
         :host ::ng-deep .p-dialog .product-image {
             width: 150px;
             margin: 0 auto 2rem auto;
             display: block;
         }
     `],
  providers: [MessageService, ConfirmationService]
})
<<<<<<< HEAD
export class ListMedicinesComponent implements OnInit {
=======
export class ListMedicinesComponent implements OnInit, OnChanges {
>>>>>>> ea7f11bb018470f0aca29433870bf55fd2250097

  medicines: Medicine[] = [];
  medicineDialog: boolean = false;
  medicine: Medicine = new Medicine('', '', '');
  submitted: boolean = false;
  isEdit: boolean = false;
<<<<<<< HEAD
  // addForm: FormGroup | any;

  constructor(public medicineService: MedicineService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    // private formBuilder: FormBuilder
  ) { }
=======

  // dt: any;

  constructor(public medicineService: MedicineService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnChanges(): void {
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }
>>>>>>> ea7f11bb018470f0aca29433870bf55fd2250097

  ngOnInit(): void {
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });

    // this.formValidation();
  }


  clickEdit(med: Medicine) {
    this.isEdit = true;
<<<<<<< HEAD
    this.medicine = { ...med };
    // this.submitted = false;
=======
    this.medicine = {...med};
    this.submitted = false;
>>>>>>> ea7f11bb018470f0aca29433870bf55fd2250097
    this.medicineDialog = true;
  }

  clickAdd() {
    this.isEdit = false;
    this.medicine = new Medicine('', '', '');
    // this.submitted = false;
    this.medicineDialog = true;
  }

  clickDelete(i: string) {
    this.medicineService.id = i;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.medicine.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.medicineService.deleteMedicine(this.medicineService.id).subscribe(() => {
        });

        this.reloadData();
<<<<<<< HEAD
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Medicine Deleted', life: 3000 });
=======
        // console.log(this.medicines.length);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Medicine Deleted', life: 3000});
>>>>>>> ea7f11bb018470f0aca29433870bf55fd2250097
      }
    });
  }

  save() {
    if (this.isEdit) {
<<<<<<< HEAD
      this.medicineService.editMedicine(this.medicine).subscribe({
        next: a => {
          this.medicine = a;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Medicine Updated', life: 3000 });
          this.hideDialog();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Foailed', detail: 'Medicine  Not Updated', life: 3000 });
        }
      });
      this.reloadData();
    } else {
      this.medicineService.addMedicine(this.medicine).subscribe({
        next: a => {
          this.medicine = a;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Medicine Added', life: 3000 });
          this.hideDialog();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Foailed', detail: 'Medicine  Not Added', life: 3000 });
        }
=======
      // this.medicines[this.findIndexById(this.medicine._id)] = this.medicine;
      this.medicineService.editMedicine(this.medicine).subscribe(() => {
      });

      this.reloadData();
    } else {
      // this.medicines.push(this.medicine);
      this.medicineService.addMedicine(this.medicine).subscribe(() => {
>>>>>>> ea7f11bb018470f0aca29433870bf55fd2250097
      });
    }
<<<<<<< HEAD
    this.reloadData();
=======
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Medicine Updated', life: 3000});
    this.medicineDialog = false;
>>>>>>> ea7f11bb018470f0aca29433870bf55fd2250097
  }

  hideDialog() {
    this.reloadData();
    this.medicineDialog = false;
    this.submitted = false;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  reloadData() {
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }

}
