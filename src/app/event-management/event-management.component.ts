import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {EventService} from "../services/event.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEventComponent} from "../add-event/add-event.component";
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

  deleteEvent(id: string) {
    this.eventService.deleteEventById(id).subscribe(
      () => {
        this.eventService.getEvents().subscribe((data) => {
          this.events = data;
        });
      }
    );
  }

  openAddEventForm() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(AddEventComponent).afterClosed().subscribe(
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
}
