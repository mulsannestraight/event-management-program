import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {EventService} from "../services/event.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEventComponent} from "../add-event/add-event.component";
import {EditEventComponent} from "../edit-event/edit-event.component";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {
  events: any;

  constructor(private loginService: LoginService,
              private router: Router,
              private eventService: EventService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data;
      }
    );
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/"]);
  }

  get user() {
    return localStorage.getItem("username");
  }

  openAddEventForm() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;

    let dialogRef = this.dialog.open(AddEventComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {

        // when dialog is closed after the user submits a form, `true` is
        // return to signal a successful event addition. We then update the
        // event management accordingly
        if (data) {
          this.eventService.getEvents().subscribe(
            (data) => {
              this.events = data;
            }
          );
        }
      }
    );
  }

  openEditEventForm(event: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = event;

    let dialogRef = this.dialog.open(EditEventComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {

        if (data) {
          this.eventService.getEvents().subscribe(
            (data) => {
              this.events = data;
            }
          );
        }
      }
    );
  }

  openDeleteConfirmation(id: string) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;

    let dialogRef = this.dialog.open(DeleteConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {

        // If data received from dialog is `true`, confirm the deletion.
        // Otherwise do nothing
        if (data) {
          this.eventService.deleteEventById(id).subscribe(
            () => {
              this.eventService.getEvents().subscribe((data) => {
                this.events = data;
              });
            }
          );
        }
      }
    );
  }
}
