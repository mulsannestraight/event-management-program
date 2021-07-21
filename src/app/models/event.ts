export interface Event {
  _id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  location: string;
  isRegistrationAllowed: boolean;
  eventImage: string;
  adultTicketPrice: number;
  childTicketPrice: number;
}
