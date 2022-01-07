import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  UserEventViewComponent
} from '../user-event-view/user-event-view.component';

@Component({
  selector: 'app-user-event-management',
  templateUrl: './user-event-management.component.html',
  styleUrls: ['./user-event-management.component.css']
})
export class UserEventManagementComponent implements OnInit {
  randomImages: string[] = [
    'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/3214944/pexels-photo-3214944.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  ];

  events: any;
  randomImageIndex: number = 0;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private eventService: EventService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data;
      }
    );
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  get user() {
    return localStorage.getItem('username');
  }

  showEvents(event: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = event;

    this.dialog.open(UserEventViewComponent, dialogConfig);
  }
}
