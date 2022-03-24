import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/Class/medicine';
import { MedicineService } from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-remove-medicine',
  templateUrl: './remove-medicine.component.html',
  styleUrls: ['./remove-medicine.component.css']
})
export class RemoveMedicineComponent implements OnInit {

  constructor(private medicineService: MedicineService) { }
  // newMedicine: Medicine = new Medicine('', '', '');
  // id: string = '';
  ngOnInit(): void {
    // this.id = this.medicineService.id;
    console.log(this.medicineService.id)
  }
  remove() {
    // console.log(this.newMedicine._id);
    this.medicineService.deleteMedicine(this.medicineService.id).subscribe((res) => {
      // this.medicines = res;
    });;
  }

}
