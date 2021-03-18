import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImportantDeadline } from '../shared/definitions';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  private deadlinesSubject = new BehaviorSubject<ImportantDeadline[]>(null);
  public deadlinesObservable = this.deadlinesSubject.asObservable();

  constructor() { }

  public setImportantDeadlines(deadlines: ImportantDeadline[]): void {
    this.deadlinesSubject.next(deadlines);
  }
}
