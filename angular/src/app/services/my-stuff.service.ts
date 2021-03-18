import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Assignment, Grade, Reading } from '../shared/definitions';

@Injectable({
  providedIn: 'root'
})
export class MyStuffService {
  private myStuff: MyStuff = {
    reading: [],
    grades: [],
    assignments: []
  };

  private myStuffSubject = new BehaviorSubject<MyStuff>(this.myStuff);
  public myStuffObservable = this.myStuffSubject.asObservable();


  constructor() { }

  public addReadingToMyStuff(reading: Reading): void {
    this.myStuff.reading.push(reading);
    this.myStuffSubject.next(this.myStuff);
  }

  public removeReadingFromMyStuff(reading: Reading): void {
    this.myStuff.reading.splice(this.myStuff.reading.findIndex((r: Reading) => {
      return r == reading;
    }), 1);

    this.myStuffSubject.next(this.myStuff);
  }
}

export type MyStuff = {
  reading: Reading[];
  grades: Grade[];
  assignments: Assignment[];
};
