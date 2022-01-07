import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-event-view',
  templateUrl: './user-event-view.component.html',
  styleUrls: ['./user-event-view.component.css']
})
export class UserEventViewComponent implements OnInit {
  event: any;
  eventViewForm: any;

  constructor(
    private dialogRef: MatDialogRef<UserEventViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder
  ) {

    this.event = data;
  }

  ngOnInit(): void {
    let startDateValue = this.event.startDate.split('T')[0];
    let endDateValue = this.event.endDate.split('T')[0];

    this.eventViewForm = this.fb.group({
      name: [this.event.name],
      description: [this.event.description],
      location: [this.event.location],
      category: [this.event.category],
      startDate: [startDateValue],
      endDate: [endDateValue],
      startTime: [this.event.startTime],
      endTime: [this.event.endTime],
      adultTicketPrice: [this.event.adultTicketPrice],
      childTicketPrice: [this.event.childTicketPrice]
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
