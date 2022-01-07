import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  apiURL = "http://localhost:3000/events";

  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiURL);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiURL}/${id}`);
  }

  deleteEventById(id: string): Observable<Event> {
    return this.http.delete<Event>(`${this.apiURL}/${id}`);
  }

  addEvent(event: any): Observable<Event> {
    return this.http.post<Event>(this.apiURL, event);
  }

  updateEventById(id: string, event: any): Observable<Event> {
    return this.http.put<Event>(`${this.apiURL}/${id}`, event);
  }
}
