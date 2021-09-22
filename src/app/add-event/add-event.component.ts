import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {EventService} from "../services/event.service";
import {dateRangeValidator} from "../services/date-range-validator";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  addEventForm: any;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddEventComponent>,
              private eventService: EventService) { }

  ngOnInit(): void {
    this.addEventForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      location: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
      adultTicketPrice: ["", [
        Validators.required,
        Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)
      ]],
      childTicketPrice: ["", [
        Validators.required,
        Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)
      ]],
      isRegistrationAllowed: ["yes", Validators.required]
    }, {validators: dateRangeValidator("startDate", "endDate")});
  }

  onSubmit() {
    // get a copy of form values for modification
    let formValues = Object.assign({}, this.addEventForm.value);

    formValues.isRegistrationAllowed = formValues.isRegistrationAllowed === "yes";

    this.eventService.addEvent(formValues).subscribe(
      () => {
        console.log("A new event has been created.");

        // anything you pass to close() will be received by whoever is activating
        // the dialog window (in this case, the `Add new event` button in the
        // event-management component
        this.dialogRef.close(true);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get name() {
    return this.addEventForm.get("name");
  }

  get description() {
    return this.addEventForm.get("description");
  }

  get category() {
    return this.addEventForm.get("category");
  }

  get location() {
    return this.addEventForm.get("location");
  }

  get startDate() {
    return this.addEventForm.get("startDate");
  }

  get endDate() {
    return this.addEventForm.get("endDate");
  }

  get startTime() {
    return this.addEventForm.get("startTime");
  }

  get endTime() {
    return this.addEventForm.get("endTime");
  }

  get adultTicketPrice() {
    return this.addEventForm.get("adultTicketPrice");
  }

  get childTicketPrice() {
    return this.addEventForm.get("childTicketPrice");
  }

  get isRegistrationAllowed() {
    return this.addEventForm.get("isRegistrationAllowed");
  }
}
