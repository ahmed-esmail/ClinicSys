import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Medicine } from 'src/app/Class/medicine';
import { MedicineService } from 'src/app/Services/medicine.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

// declare var $: any;

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
export class ListMedicinesComponent implements OnInit {

  // @ViewChild('dataTable', { static: false }) table: any;
  // dataTable: any;
  // dtOptions: DataTables.Settings = {};

  medicines: Medicine[] = [];

  showAdd: boolean = false;
  showEdit: boolean = false;
  showDelete: boolean = false;


  medicineDialog: boolean = false;
  medicine: Medicine = new Medicine('', '', '');
  // selectedMedicines: Medicine[] = [];
  submitted: boolean = false;
  // statuses: any[];
  isEdit: boolean = false;

  constructor(public medicineService: MedicineService, private messageService: MessageService, private confirmationService: ConfirmationService){}
  // constructor() { }

  ngOnInit(): void {
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
    // this.medicineService.getAllMedicines().subscribe(
    //   {
    //     next: a => { this.medicines = a; }
    //   }
    // );
    // this.dtOptions = {
    //   pagingType: 'full_numbers'
    // };
  }

  // ngAfterViewInit(): void {
  //   this.dataTable = $(this.table.nativeElement);
  //   this.dataTable.DataTable();
  // }

  clickEdit(med: Medicine) {
    this.isEdit = true;
    this.medicine = { ...med };
    this.submitted = false;
    this.medicineDialog = true;
    // this.showAdd = false;
    // this.showEdit = true;
    // this.showDelete = false;
    // this.medicineService.id = i;
    // this.openNew();
    // console.log(i);
  }
  clickAdd() {
    // this.showAdd = true;
    // this.showEdit = false;
    // this.showDelete = false;
    // this.isEdit = false;
    // this.openNew();
    this.isEdit = false;
    this.medicine = new Medicine('', '', '');
    this.submitted = false;
    this.medicineDialog = true;
  }
  clickDelete(i: string) {
    // this.showAdd = false;
    // this.showEdit = false;
    // this.showDelete = true;
    this.medicineService.id = i;
    // this.medicineService.deleteMedicine(i);
    console.log("click delete");
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.medicine._id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.medicineService.deleteMedicine(this.medicineService.id).subscribe(() => {
        });;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  save() {
    console.log(this.medicine);
    if (this.isEdit) {
      this.medicineService.editMedicine(this.medicine).subscribe(() => {
      });;
    } else {
      this.medicineService.addMedicine(this.medicine).subscribe(() => {
      });
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    this.medicineDialog = false;
  }

  // edit() {
  //   console.log(this.medicine._id);
  //   this.medicineService.editMedicine(this.medicine).subscribe(() => {
  //   });;
  // }
 
  // openNew() {
  //   this.isEdit = false;
  //   this.medicine = new Medicine('', '', '');
  //   this.submitted = false;
  //   this.medicineDialog = true;
  // }

  // openEdit(med: Medicine) {
  //   this.medicine = { ...med };
  //   this.submitted = false;
  //   this.medicineDialog = true;
  // }

  // deleteMedicine() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + this.medicine._id + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.medicineService.deleteMedicine(this.medicineService.id).subscribe(() => {
  //       });;
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  //     }
  //   });
  // }

  hideDialog() {
    this.medicineDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    // if (this.product.name.trim()) {
    //   if (this.product.id) {
    //     this.products[this.findIndexById(this.product.id)] = this.product;
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //   }
    //   else {
    //     this.product.id = this.createId();
    //     this.product.image = 'product-placeholder.svg';
    //     this.products.push(this.product);
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //   }

    //   this.products = [...this.products];
    //   this.productDialog = false;
    //   this.product = {};
    // }
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

  // createId(): string {
  //   let id = '';
  //   var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (var i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }
}
