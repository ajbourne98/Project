import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImportantDeadline } from '../shared/definitions';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  private deadlinesSubject = new BehaviorSubject<ImportantDeadline[]>(null);
  public deadlinesObservable = this.deadlinesSubject.asObservable();

  /**
   * Sets the new value of deadlinesSubject
   *
   * @param ImportantDeadline[] deadlines - the new value
   *
   * @return void
   */
  public setImportantDeadlines(deadlines: ImportantDeadline[]): void {
    this.deadlinesSubject.next(deadlines);
  }
}
