import { Component, OnInit } from '@angular/core';
import { DeadlineService } from 'src/app/services/deadline.service';
import { ImportantDeadline } from 'src/app/shared/definitions';

@Component({
  selector: 'app-deadlines',
  templateUrl: './deadlines.component.html',
  styleUrls: ['./deadlines.component.scss']
})
export class DeadlinesComponent implements OnInit {
  public deadlines: ImportantDeadline[] = [];

  constructor(private deadlineService: DeadlineService) { }

  ngOnInit(): void {
    this.deadlineService.deadlinesObservable.subscribe((deadlines: ImportantDeadline[]) => {
      this.deadlines = deadlines;
    });
  }

  public formatDate(date: Date): string {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    let ddString: string, mmString: string;

    ddString = `${dd < 10 ? '0' : ''}${dd}`;
    mmString = `${mm < 10 ? '0' : ''}${mm}`;

    return `${ddString}/${mmString}/${yyyy}`;
  }
}
