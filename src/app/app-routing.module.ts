import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {EventManagementComponent} from "./event-management/event-management.component";
import {UserEventManagementComponent} from "./user-event-management/user-event-management.component";
import {LoginGuard} from "./guards/login.guard";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
  {path: "", component: LoginComponent},
  {
    path: "event_mgmt",
    component: EventManagementComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "user_event_mgmt",
    component: UserEventManagementComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
