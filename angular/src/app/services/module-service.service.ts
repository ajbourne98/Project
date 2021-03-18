import { Injectable } from '@angular/core';
import { SidebarItem } from '../sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private modules: Module[] = [];
  private maxLectureId = 0;

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

  public toggleLectureWatched(moduleId: number, lectureId: number): void {
    let module = this.modules.find((module: Module) => {
      return module.id === moduleId;
    });

    let lecture = module.lectures.find((lecture: Lecture) => {
      return lecture.id === lectureId;
    });

    lecture.watched = !lecture.watched;

    console.log(lecture.watched);
  }

  private initModules(): void {
    this.modules = [
      {
        name: 'Module 1',
        id: 0,
        lectures: this.generateLectures(24)
      },
      {
        name: 'Module 2',
        id: 1,
        lectures: this.generateLectures(3)
      },
      {
        name: 'Module 3',
        id: 2,
        lectures: this.generateLectures(2)
      },
      {
        name: 'Module 4',
        id: 3,
        lectures: this.generateLectures(3)
      },
    ];
  }

  private generateLectures(amount: number): Lecture[] {
    let lectures: Lecture[] = [];
    let date: Date = new Date('01/01/2021');
    let count = 1;

    for (let i = 0; i < amount; i++) {
      lectures.push({
        name: `Lecture ${count++}`,
        id: this.maxLectureId++,
        date: new Date(date.valueOf()),
        watched: false
      });

      date.setDate(date.getDate() + 7);
    }

    return lectures;
  }
}

export type Module = {
  name: string;
  id: number;
  lectures: Lecture[];
};

export type Lecture = {
  id: number;
  name: string;
  date: Date;
  watched: boolean;
};
