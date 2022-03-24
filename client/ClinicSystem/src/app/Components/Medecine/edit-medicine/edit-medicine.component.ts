import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/Class/medicine';
import { MedicineService } from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-edit-medicine',
  templateUrl: './edit-medicine.component.html',
  styleUrls: ['./edit-medicine.component.css']
})
export class EditMedicineComponent implements OnInit {

  constructor(private medicineService: MedicineService) { }
  newMedicine: Medicine = new Medicine('', '', '');
  id: string = '';
  ngOnInit(): void {
    this.newMedicine._id = this.medicineService.id;
    console.log(this.medicineService.id)
  }
  edit() {
    console.log(this.newMedicine._id);
    this.medicineService.editMedicine(this.newMedicine).subscribe((res) => {
      // this.medicines = res;
    });;
  }

}
