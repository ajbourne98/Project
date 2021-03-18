import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.scss']
})
export class ActivitesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public showDeadlines(): boolean {
    return this.router.url.includes('modules');
  }
}
