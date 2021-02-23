import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public showAddTodoItemModal = false;

  private tasks: todoItem[];

  constructor() { }

  ngOnInit(): void {
    this.tasks = [
      {
        text: 'Test todo item 1',
        checked: false,
        category: 'general'
      },
      {
        text: 'Test todo item 2',
        checked: false,
        category: 'module 1'
      },
      {
        text: 'Test todo item 3',
        checked: false,
        category: 'general'
      }
    ];
  }

  public getTodoItems(): todoItem[] {
    return this.tasks;
  }

  public getItemsByCategory(category: string): todoItem[] {
    return this.tasks.filter((task: todoItem) => {
      return task.category === category;
    });
  }

  public onItemCheck(task: todoItem): void {
    task.checked = !task.checked;
  }

  public getCategories(): string[] {
    let a: string[] = [];

    return this.tasks.map((task: todoItem) => {
      return task.category;
    }).filter((category: string) => {
      let duplicate = a.includes(category);

      if (!duplicate) {
        a.push(category);
      }

      return !duplicate;
    });
  }

  public onAddTodoItemClick(event: any): void {
    event.stopPropagation();
    this.showAddTodoItemModal = true;
  }
}

export type todoItem = {
  text: string;
  checked: boolean;
  category: string;
};
