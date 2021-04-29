import { Injectable } from '@angular/core';
import { Assignment, ImportantDeadline, Reading } from '../shared/definitions';
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
  }

  private initModules(): void {
    this.modules = [
      {
        name: 'Logic and Semantics of Programming Languages',
        id: 0,
        lectures: this.generateLectures(25),
        reading: [
          { id: 0, moduleId: 0, name: 'Douglas Stinson. Cryptography theory and practice (Discrete mathematics and its applications), Chapman & Hall/CRC, 3rd edition, 2005' },
          { id: 1, moduleId: 0, name: 'J. H. Silverman. An Introduction to Mathematical Cryptography Springer, 2008. (Available as an e-book.)' },
        ],
        assignments: [
          { id: 0, moduleId: 0, name: 'Coursework 1' },
          { id: 1, moduleId: 0, name: 'Coursework 2' },
        ],
        deadlines: [
          { date: new Date('03/12/2021'), info: 'Coursework 1 Due' },
          { date: new Date('04/12/2021'), info: 'Coursework 2 Due' },
        ]
      },
      {
        name: 'Module 2',
        id: 1,
        lectures: this.generateLectures(3),
        reading: [
          { id: 1, moduleId: 1, name: 'Some Book 1' },
          { id: 2, moduleId: 1, name: 'Some Book 2' }
        ],
        assignments: [
          { id: 2, moduleId: 1, name: 'Test Assignment 1' },
          { id: 3, moduleId: 1, name: 'Test Assignment 2' },
          { id: 4, moduleId: 1, name: 'Test Assignment 3' }
        ],
        deadlines: [
          { date: new Date(), info: 'Test deadline 1' },
          { date: new Date(), info: 'Test deadline 2' },
        ]
      },
      {
        name: 'Module 3',
        id: 2,
        lectures: this.generateLectures(2),
        reading: [
          { id: 3, moduleId: 2, name: 'Some Book 1' }
        ],
        assignments: [
          { id: 5, moduleId: 2, name: 'Test Assignment 1' },
          { id: 6, moduleId: 2, name: 'Test Assignment 2' }
        ],
        deadlines: [
          { date: new Date(), info: 'Test deadline 1' },
          { date: new Date(), info: 'Test deadline 2' },
          { date: new Date(), info: 'Test deadline 3' },
        ]
      },
      {
        name: 'Module 4',
        id: 3,
        lectures: this.generateLectures(3),
        reading: [
          { id: 4, moduleId: 3, name: 'Some Book 1' }
        ],
        assignments: [
          { id: 7, moduleId: 3, name: 'Test Assignment 1' },
          { id: 8, moduleId: 3, name: 'Test Assignment 2' },
          { id: 9, moduleId: 3, name: 'Test Assignment 3' }
        ],
        deadlines: [
          { date: new Date(), info: 'Test deadline 1' },
        ]
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

      date.setDate(date.getDate() + 2);
    }

    return lectures;
  }
}

export type Module = {
  name: string;
  id: number;
  lectures: Lecture[];
  reading: Reading[];
  assignments: Assignment[];
  deadlines: ImportantDeadline[];
};

export type Lecture = {
  id: number;
  name: string;
  date: Date;
  watched: boolean;
};
