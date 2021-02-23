import { Component, OnInit } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public faPlus = faPlus;
  public faMinus = faMinus;

  private sidebarItems: SidebarItem[];

  constructor() { }

  ngOnInit(): void {
    this.sidebarItems = [
      {
        label: 'Home',
        subItems: null
      },
      {
        label: 'Modules',
        subItems: [
          {
            label: 'Module 1',
            subItems: null
          },
          {
            label: 'Module 2',
            subItems: null
          },
          {
            label: 'Module 3',
            subItems: null
          },
          {
            label: 'Module 4',
            subItems: null
          }
        ],
        expanded: false
      },
      {
        label: 'My Stuff',
        subItems: null
      },
    ];
  }

  public getSidebarItems(): SidebarItem[] {
    return this.sidebarItems;
  }

  public onItemClick(item: SidebarItem): void {
    item.expanded = !item.expanded;
  }
}

export type SidebarItem = {
  label: string;
  subItems: SidebarItem[];
  expanded?: boolean;
}
