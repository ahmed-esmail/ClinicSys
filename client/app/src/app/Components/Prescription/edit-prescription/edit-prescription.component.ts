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
    private formBuilder: FormBuilder
  ) {
  }

  medicines: Medicine[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  // id: string = "";
  
  med: string = "";
  dose: string = "";

  form: FormGroup | any;
  addForm: FormGroup | any;
  
  submitted: boolean = false;
  presDialog: boolean = false;
  isAdd: boolean = false;

  arr: [{ medicine: string, dose: string }] = [{ medicine: '', dose: '' }];
  prescription: Prescription = new Prescription('', new Date, '', '', [{ medicine: "", dose: "" },]);

  ngOnInit(): void {
    console.log("pres");
    console.log(this.dynamicDialogConfig.data.pre);
    this.prescription = this.dynamicDialogConfig.data.pre;
    console.log(this.prescription);


    this.arr = this.prescription.medicines;
    this.presDialog = true;
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });

    this.formValidation();
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
    console.log(this.prescription.date);
    console.log(this.prescription.medicines);
    console.log(this.prescription.doctor);
    console.log(this.prescription.patient);
    this.presDialog = false;
    this.prescription.medicines = this.arr;

    this.prescriptionService.editprescription(this.prescription).subscribe((res) => {
      // this.medicines = res;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Prescription Updated', life: 3000 });

      this.hideDialog();
    });
  }


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
