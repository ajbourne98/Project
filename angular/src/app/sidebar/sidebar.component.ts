import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faMinus, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ModuleService } from '../services/module.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public faPlus = faPlus;
  public faMinus = faMinus;
  public faChevronRight = faChevronRight;

  private sidebarItems: SidebarItem[];

  constructor(private moduleService: ModuleService, private router: Router) { }

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
        expanded: this.moduleService.getModulesForSidebar().length < 5,
        link: null
      },
      {
        label: 'My Stuff',
        subItems: null,
        link: 'my-stuff'
      },
    ];
  }

  public getSidebarItems(): SidebarItem[] {
    return this.sidebarItems;
  }

  public onItemClick(item: SidebarItem): void {
    item.expanded = !item.expanded;
  }

  public isCurrentPage(url: string): boolean {
    return this.router.url.includes(`/${url}`);
  }
}

export type SidebarItem = {
  label: string;
  subItems: SidebarItem[];
  expanded?: boolean;
  link: string;
}
