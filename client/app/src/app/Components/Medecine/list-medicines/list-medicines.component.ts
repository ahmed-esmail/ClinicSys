import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Medicine} from 'src/app/_models/medicine';
import {MedicineService} from 'src/app/Services/medicine.service';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';

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
export class ListMedicinesComponent implements OnInit, OnChanges {

  medicines: Medicine[] = [];
  // medicinesCopy: Medicine[] = this.medicines;
  // medc: Medicine[] = [];
  medicineDialog: boolean = false;
  medicine: Medicine = new Medicine('', '', '');
  submitted: boolean = false;
  isEdit: boolean = false;

  // dt: any;

  constructor(public medicineService: MedicineService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnChanges(): void {
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }

  ngOnInit(): void {
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }


  clickEdit(med: Medicine) {
    this.isEdit = true;
    this.medicine = {...med};
    this.submitted = false;
    this.medicineDialog = true;
  }

  clickAdd() {
    this.isEdit = false;
    this.medicine = new Medicine('', '', '');
    this.submitted = false;
    this.medicineDialog = true;
  }

  clickDelete(i: string) {
    this.medicineService.id = i;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.medicine.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // console.log(this.medicines.length);
        this.medicineService.deleteMedicine(this.medicineService.id).subscribe(() => {
        });

        this.reloadData();
        // console.log(this.medicines.length);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Medicine Deleted', life: 3000});
      }
    });
  }

  save() {
    console.log(this.medicine);
    if (this.isEdit) {
      // this.medicines[this.findIndexById(this.medicine._id)] = this.medicine;
      this.medicineService.editMedicine(this.medicine).subscribe(() => {
      });

      this.reloadData();
    } else {
      // this.medicines.push(this.medicine);
      this.medicineService.addMedicine(this.medicine).subscribe(() => {
      });
      this.reloadData();
    }
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Medicine Updated', life: 3000});
    this.medicineDialog = false;
  }

  hideDialog() {
    this.medicineDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.medicines.length; i++) {
      if (this.medicines[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  reloadData() {
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }

  // applyFilterGlobal($event: { target: HTMLInputElement; }, stringVal: any) {
  //   this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  // }
  // applyFilterGlobal($event: any, stringVal: any) {
  //   this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  // }
}
