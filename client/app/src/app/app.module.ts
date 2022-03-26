import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DoctorService } from './doctor.service';
import { ReceptionistService } from './receptionist.service';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [DoctorService, ReceptionistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
