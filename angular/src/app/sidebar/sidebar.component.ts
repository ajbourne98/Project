import { Component, OnInit } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ModuleService } from '../services/module-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public faPlus = faPlus;
  public faMinus = faMinus;

  private sidebarItems: SidebarItem[];

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.sidebarItems = [
      {
        label: 'Home',
        subItems: null,
        link: 'home'
      },
      {
        label: 'Modules',
        subItems: this.moduleService.getModulesForSidebar(),
        expanded: false,
        link: null
      },
      {
        label: 'My Stuff',
        subItems: null,
        link: null
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
  link: string;
}
