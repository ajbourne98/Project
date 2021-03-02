import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public showAddTodoItemModal = false;
  public addItemForm: FormGroup;

  private tasks: todoItem[];

  constructor(private fb: FormBuilder) { }

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

    this.initForm();
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

  private initForm(): void {
    this.addItemForm = this.fb.group({
      text: [''],
    });
  }
}

export type todoItem = {
  text: string;
  checked: boolean;
  category: string;
};
