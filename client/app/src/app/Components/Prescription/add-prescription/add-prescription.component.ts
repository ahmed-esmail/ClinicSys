import {Component, OnInit} from '@angular/core';
import {Medicine} from 'src/app/_models/medicine';
import {Prescription} from 'src/app/_models/prescription';
import {PrescriptionService} from 'src/app/Services/prescription.service';
import {MedicineService} from 'src/app/Services/medicine.service';
// import { FormGroup } from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {PatientService} from 'src/app/Services/patient.service';
import {Patient} from 'src/app/_models/patient';
import {Doctor} from 'src/app/_models/doctor';
import {DoctorService} from 'src/app/Services/doctor.service';


@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css'],
  styles: [`
         :host ::ng-deep .p-dialog {
             width: 150px;
             margin: 0 auto 2rem auto;
             display: block;
         }
     `],

})
export class AddPrescriptionComponent implements OnInit {

  //service of doctors
  constructor(private prescriptionService: PrescriptionService,
              public medicineService: MedicineService,
              public patientService: PatientService,
              public doctorService: DoctorService,
              public ref: DynamicDialogRef,
              public messageService: MessageService,
              private formBuilder: FormBuilder
  ) {
  }

  medicines: Medicine[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];

  med: string = "";
  dose: string = "";
  // pa: string = "";

  form: FormGroup | any;
  addForm: FormGroup | any;

  submitted: boolean = false;
  presDialog: boolean = false;
  isAdd: boolean = false;


  arr: [{ medicine: string, dose: string }] = [{medicine: '', dose: ''}];
  prescription: Prescription = new
  Prescription('', new Date, '', '', [{medicine: "", dose: ""},]);

  ngOnInit(): void {
    this.presDialog = true;
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
    this.patientService.getpatients().subscribe((res) => {
      this.patients = res;
    });
    this.doctorService.getAllDoctors().subscribe((res) => {
      this.doctors = res;
    });

    this.formValidation();
  }

  add() {
    if (this.isAdd) {
      console.log(this.med);
      if (this.arr[0].medicine != "" && this.arr[0].dose != "") {
        this.arr.push({medicine: this.med, dose: this.dose});
      } else if (this.med != "" && this.dose != "") {
        this.arr[0] = {medicine: this.med, dose: this.dose};
      }
    } else {
      this.isAdd = true;
    }
    // this.reloadData();
    // console.log(this.arr);
    // console.log(this.pa);
  }

  save() {
    this.presDialog = false;
    this.submitted = true;
    // this.prescription.patient = this.pa;
    this.prescription.medicines = this.arr;
    console.log("ppre");
    console.log(this.prescription);
    this.prescriptionService.addprescription(this.prescription).subscribe(() => {
    });
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Prescription Added', life: 3000});

    this.hideDialog();
  }

  hideDialog() {
    this.presDialog = false;
    this.submitted = false;
    this.ref.close();
  }

  // reloadData() {
  //   // this.prescriptionService.getAllprescriptions().subscribe((res) => {
  //   //   this.prescriptions = res;
  //   // });
  //   this.medicineService.getAllMedicines().subscribe((res) => {
  //     this.medicines = res;
  //   });
  // }

  formValidation() {
    this.form = this.formBuilder.group({
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      patient: ['', Validators.required],
      medicine: ['', Validators.required],
      medicines: ['',
        Validators.required,
        // Validators.minLength(8),
      ],
    });
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
