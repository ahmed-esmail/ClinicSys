import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/_models/medicine';
import { Prescription } from 'src/app/_models/prescription';
import { PrescriptionService } from 'src/app/Services/prescription.service';
import { MedicineService } from 'src/app/Services/medicine.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/Services/patient.service';
import { Patient } from 'src/app/_models/patient';
import { Doctor } from 'src/app/_models/doctor';
import { DoctorService } from 'src/app/Services/doctor.service';
import { User } from 'src/app/_models/user';



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
    public patientService: PatientService,
    public doctorService: DoctorService,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
  ) {
  }

  medicines: Medicine[] = [];

  med: string = "";
  dose: string = "";

  form: FormGroup | any;
  addForm: FormGroup | any;

  submitted: boolean = false;
  // presDialog: boolean = false;
  isAdd: boolean = false;

  arr: [{ medicine: string, dose: string }] = [{ medicine: '', dose: '' }];
  prescription: Prescription = new Prescription('', new Date, '', '', [{ medicine: "", dose: "" },]);

  ngOnInit(): void {
    console.log("pres");
    console.log(this.dynamicDialogConfig.data.pre);
    this.prescription = { ...this.dynamicDialogConfig.data.pre };
    this.arr = this.prescription.medicines;
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });

    this.formValidation();
  }
  add() {
    if (this.isAdd) {
      if (this.med != "" && this.dose != "") {

        if (this.arr.find((x) => x.medicine === this.med)) {
          console.log("find med");
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Failed To Add Duplicated Medicine', life: 3000 });
        } else {
          console.log(" not find med");
          if (this.arr[0].medicine != "" && this.arr[0].dose != "") {
            this.arr.push({ medicine: this.med, dose: this.dose });
          } else {
            this.arr[0] = { medicine: this.med, dose: this.dose };
          }
        }
      }
    } else {
      this.isAdd = true;
    }
  }
  delete(i: number) {
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
    this.prescription.medicines = this.arr;
    this.prescriptionService.editprescription(this.prescription).subscribe({
      next: a => {
        this.prescription = a;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Prescription Updated', life: 3000 });
        this.hideDialog();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Foailed', detail: 'Prescription Not Updated', life: 3000 });
      }
    });
  }


  hideDialog() {
    this.submitted = false;
    this.dynamicDialogRef.close();
  }

  reloadData() {
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }

  formValidation() {
    // this.form = this.formBuilder.group({
    //   doctor: ['', Validators.required],
    //   date: ['', Validators.required],
    //   patient: ['', Validators.required],
    //   medicine: ['', Validators.required],
    //   medicines: ['',
    //     Validators.required,
    //     // Validators.minLength(8),
    //   ],
    // });
    this.addForm = this.formBuilder.group({
      medDose: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(8),
      ]
      ],
      medicine: ['', Validators.required],
    });
  }


}
