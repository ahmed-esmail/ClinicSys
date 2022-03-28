import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../_models/doctor';
import { User } from '../_models/user';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  editForm: FormGroup|any;

  eDoctor:Doctor = new Doctor(new User( "", "", "", "", 25, "", "", "", "Doctor", "", ""), "", [], [])

  genders: any = [];
  specialities: any = [];

  image!:File;

  constructor(private drSer:DoctorService, public router:Router, public ar:ActivatedRoute, private fb: FormBuilder, public http:HttpClient) { }

  ngOnInit(): void {

    this.createFormValidation();

    this.ar.params.subscribe(a=>{
      this.drSer.getDoctorById(a['id']).subscribe({
        next: a=> {
          this.eDoctor = a;
        }
      })
    })
    
    this.genders = this.drSer.genders;

    this.specialities = this.drSer.specialities;

  }

  // validations
  createFormValidation() {
    this.editForm = this.fb.group({
      firstName: ['', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$')
        ] 
      ],
      lastName: ['', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$')
        ] 
      ],
      phoneNumber: ['', [
          Validators.required,
          Validators.pattern('^(010|011|012|015)[0-9]{8}$'),
        ] 
      ],
      age: ['', [
          Validators.required,
          Validators.pattern('^[2-9][0-9]$|^100$')
        ] 
      ],
      gender: ['', Validators.required ],
      email: ['', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$'),
        ] 
      ],
      speciality: ['', Validators.required ],
      address: ['', Validators.required ]
    });
  }

  update()
  {
    console.log(this.eDoctor)
    this.drSer.editDoctor(this.eDoctor).subscribe(
      a=>{
        this.editForm.pristine = true;
      }
    )
  }

  selectFile(event:any) {
    const file:File = event.target.files[0];
  
    if (file) {
      this.image = file;
    
      const formData = new FormData();
      formData.append('file', this.image);

      this.http.post<any>('http://localhost:3000/upload', formData)
      .subscribe({
        next: (a) => {
          console.log(a);
          this.eDoctor._id.profileImg = a.image;
        }
      });
    }
  }
  
}
