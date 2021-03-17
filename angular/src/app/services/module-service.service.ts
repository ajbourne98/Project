import { Injectable } from '@angular/core';
import { SidebarItem } from '../sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private modules: Module[] = [];

  constructor() {
    this.initModules();
  }

  public getModulesForSidebar(): SidebarItem[] {
    return this.modules.map((module: Module) => {
      return {
        label: module.name,
        subItems: null,
        link: `modules/${module.id}`
      };
    });
  }

  public getModuleById(id: number): Module {
    return this.modules.find((module: Module) => {
      return module.id === id;
    });
  }

  private initModules(): void {
    this.modules = [
      {
        name: 'Module 1',
        id: 0,
        lectures: [
          { name: 'Lecture 1' },
          { name: 'Lecture 2' },
          { name: 'Lecture 3' },
          { name: 'Lecture 4' },
        ]
      },
      {
        name: 'Module 2',
        id: 1,
        lectures: [
          { name: 'Lecture 1' },
          { name: 'Lecture 2' },
          { name: 'Lecture 3' },
        ]
      },
      {
        name: 'Module 3',
        id: 2,
        lectures: [
          { name: 'Lecture 1' },
          { name: 'Lecture 2' },
        ]
      },
      {
        name: 'Module 4',
        id: 3,
        lectures: [
          { name: 'Lecture 1' },
          { name: 'Lecture 2' },
          { name: 'Lecture 3' },
        ]
      },
    ];
  }
}

export type Module = {
  name: string;
  id: number;
  lectures: Lecture[];
};

export type Lecture = {
  name: string;
};
