import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public convertStringToDate(ddmmyyyy: string): Date {
    let dateParts = ddmmyyyy.split("/");
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  }
}
