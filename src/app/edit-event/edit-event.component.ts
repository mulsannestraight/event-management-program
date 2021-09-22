import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventService} from "../services/event.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event: any;
  editEventForm: any;

  constructor(private dialogRef: MatDialogRef<EditEventComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private eventService: EventService,
              private fb: FormBuilder) {

    this.event = data;
  }

  ngOnInit(): void {

    let registrationValue = this.event.isRegistrationAllowed ? "yes" : "no";



    let startDateValue = this.event.startDate.split("T")[0];
    let endDateValue = this.event.endDate.split("T")[0];

    this.editEventForm = this.fb.group({
      name: [this.event.name, Validators.required],
      description: [this.event.description, Validators.required],
      category: [this.event.category, Validators.required],
      location: [this.event.location, Validators.required],
      startDate: [startDateValue, Validators.required],
      endDate: [endDateValue, Validators.required],
      startTime: [this.event.startTime, Validators.required],
      endTime: [this.event.endTime, Validators.required],
      adultTicketPrice: [this.event.adultTicketPrice, [
        Validators.required,
        Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)
      ]],
      childTicketPrice: [this.event.childTicketPrice, [
        Validators.required,
        Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)
      ]],
      isRegistrationAllowed: [registrationValue, Validators.required]
    });
  }

  updateEvent() {

    // this data is actually received from the parent of the dialog
    // this.dialogRef.close(this.events);

    this.eventService.updateEventById(this.event._id, this.editEventForm.value).subscribe(
      (data) => {
        console.log("An event was updated.");

        this.dialogRef.close(true);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get name() {
    return this.editEventForm.get("name");
  }

  get description() {
    return this.editEventForm.get("description");
  }

  get category() {
    return this.editEventForm.get("category");
  }

  get location() {
    return this.editEventForm.get("location");
  }

  get startDate() {
    return this.editEventForm.get("startDate");
  }

  get endDate() {
    return this.editEventForm.get("endDate");
  }

  get startTime() {
    return this.editEventForm.get("startTime");
  }

  get endTime() {
    return this.editEventForm.get("endTime");
  }

  get adultTicketPrice() {
    return this.editEventForm.get("adultTicketPrice");
  }

  get childTicketPrice() {
    return this.editEventForm.get("childTicketPrice");
  }

  get isRegistrationAllowed() {
    return this.editEventForm.get("isRegistrationAllowed");
  }
}
