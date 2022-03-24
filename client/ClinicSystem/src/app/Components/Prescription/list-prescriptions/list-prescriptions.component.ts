import { Component, OnInit } from '@angular/core';
import { Prescription } from 'src/app/Class/prescription';
import { PrescriptionService } from 'src/app/Services/prescription.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';



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
  providers: [MessageService, ConfirmationService]
})

export class ListPrescriptionsComponent implements OnInit {
  
  prescriptions: Prescription[] = [];
 
  presDialog: boolean = false;
  prescription: Prescription = new Prescription('', '', [{ medicine: "", dose: "" },]);
  selectedPrescriptions: Prescription[] = [];
  submitted: boolean = false;
  statuses: any[] = [];
  

  showAdd: boolean = false;
  showEdit: boolean = false;
  showDelete: boolean = false;

  constructor(public prescriptionService: PrescriptionService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.prescriptionService.getAllprescriptions().subscribe((res) => {
      this.prescriptions = res;
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];

  }

  openNew() {
    // this.prescription = {};
    this.submitted = false;
    this.presDialog = true;
  }

  deleteSelectedProducts() {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete the selected products?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    //     this.selectedProducts = null;
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //   }
    // });
  }

  editProduct(pres: Prescription) {
    this.prescription = { ...pres };
    this.presDialog= true;
  }

  deleteProduct(pres: Prescription) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.prescription._id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.prescriptionService.deleteprescription(this.prescriptionService.id).subscribe(() => {
        });;
        // this.products = this.products.filter(val => val.id !== product.id);
        // this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.presDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    // if (this.prescription._id.trim()) {
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
    for (let i = 0; i < this.prescriptions.length; i++) {
      if (this.prescriptions[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }


  // ngAfterViewInit(): void {
  //   // this.dataTable = $(this.table.nativeElement);
  //   // this.dataTable.DataTable();
  // }

  clickEdit(i: string) {
    this.showAdd = false;
    this.showEdit = true;
    this.showDelete = false;
    this.prescriptionService.id = i;
  }
  clickAdd() {
    this.showAdd = true;
    this.showEdit = false;
    this.showDelete = false;

    this.presDialog = true;
  }
  clickDelete(i: string) {
    this.showAdd = false;
    this.showEdit = false;
    // this.showDelete = true;
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
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Product } from '../../domain/product';
// import { ProductService } from '../../service/productservice';


// @Component({
//   templateUrl: './tablecruddemo.html',
//   styleUrls: ['./tabledemo.scss'],
//   styles: [`
//         :host ::ng-deep .p-dialog .product-image {
//             width: 150px;
//             margin: 0 auto 2rem auto;
//             display: block;
//         }
//     `],
//   providers: [MessageService, ConfirmationService]
// })
// export class TableCrudDemo implements OnInit {

//   productDialog: boolean;

//   products: Product[];

//   product: Product;

//   selectedProducts: Product[];

//   submitted: boolean;

//   statuses: any[];

//   constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

//   ngOnInit() {
//     this.productService.getProducts().then(data => this.products = data);

//     this.statuses = [
//       { label: 'INSTOCK', value: 'instock' },
//       { label: 'LOWSTOCK', value: 'lowstock' },
//       { label: 'OUTOFSTOCK', value: 'outofstock' }
//     ];
//   }

//   openNew() {
//     this.product = {};
//     this.submitted = false;
//     this.productDialog = true;
//   }

//   deleteSelectedProducts() {
//     this.confirmationService.confirm({
//       message: 'Are you sure you want to delete the selected products?',
//       header: 'Confirm',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//         this.products = this.products.filter(val => !this.selectedProducts.includes(val));
//         this.selectedProducts = null;
//         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
//       }
//     });
//   }

//   editProduct(product: Product) {
//     this.product = { ...product };
//     this.productDialog = true;
//   }

//   deleteProduct(product: Product) {
//     this.confirmationService.confirm({
//       message: 'Are you sure you want to delete ' + product.name + '?',
//       header: 'Confirm',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//         this.products = this.products.filter(val => val.id !== product.id);
//         this.product = {};
//         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
//       }
//     });
//   }

//   hideDialog() {
//     this.productDialog = false;
//     this.submitted = false;
//   }

//   saveProduct() {
//     this.submitted = true;

//     if (this.product.name.trim()) {
//       if (this.product.id) {
//         this.products[this.findIndexById(this.product.id)] = this.product;
//         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
//       }
//       else {
//         this.product.id = this.createId();
//         this.product.image = 'product-placeholder.svg';
//         this.products.push(this.product);
//         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
//       }

//       this.products = [...this.products];
//       this.productDialog = false;
//       this.product = {};
//     }
//   }

//   findIndexById(id: string): number {
//     let index = -1;
//     for (let i = 0; i < this.products.length; i++) {
//       if (this.products[i].id === id) {
//         index = i;
//         break;
//       }
//     }

//     return index;
//   }

//   createId(): string {
//     let id = '';
//     var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (var i = 0; i < 5; i++) {
//       id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
//   }
// }
