import {Component} from '@angular/core';
import {EventSettingsModel, MonthService, WeekService, WorkWeekService} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  providers: [WeekService, MonthService, WorkWeekService],
  // specifies the template string for the Schedule component
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  defaultData: Object[] = [
    {
      Id: 1,
      Subject: 'Conference',
      StartTime: new Date(2018, 1, 7, 10, 0),
      EndTime: new Date(2018, 1, 7, 11, 0),
      IsAllDay: false
    }, {
      Id: 2,
      Subject: 'Meeting - 1',
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 16, 12, 30),
      IsAllDay: false
    }, {
      Id: 3,
      Subject: 'Paris',
      StartTime: new Date(2018, 1, 13, 12, 0),
      EndTime: new Date(2018, 1, 13, 12, 30),
      IsAllDay: false
    }, {
      Id: 4,
      Subject: 'Appointment',
      StartTime: new Date(2018, 1, 12, 10, 0),
      EndTime: new Date(2018, 1, 12, 10, 30),
      IsAllDay: false
    }
  ];

  public selectedDate: Date = new Date(2018, 1, 15);
  public showWeekend: boolean = false;
  public eventSettings: EventSettingsModel = {dataSource: this.defaultData};
}
