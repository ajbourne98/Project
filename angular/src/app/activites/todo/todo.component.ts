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

  private tasks: TodoItem[];
  private categories: Category[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.tasks = [
      {
        text: 'Test todo item 1',
        checked: false,
        category: 'GENERAL'
      },
      {
        text: 'Test todo item 2',
        checked: false,
        category: 'MODULE 1'
      },
      {
        text: 'Test todo item 3',
        checked: false,
        category: 'GENERAL'
      }
    ];

    this.initCategories();
    this.initForm();
  }

  public getItemsByCategory(category: string): TodoItem[] {
    return this.tasks.filter((task: TodoItem) => {
      return task.category === category;
    });
  }

  public onItemCheck(task: TodoItem): void {
    task.checked = !task.checked;
  }

  public getCategories(allowEmptyCategories: boolean): string[] {
    return this.categories.filter((category: Category) => {
      return allowEmptyCategories ? true : category.count > 0;
    }).map((category: Category) => {
      return category.name;
    });
  }

  public onAddTodoItemClick(event: any): void {
    event.stopPropagation();
    this.showAddTodoItemModal = true;
  }

  public addTodoItem(): void {
    // Validate form
    let category: string = this.addItemForm.value.category;
    let text: string = this.addItemForm.value.text;

    if (category.length < 1 || text.length < 1) {
      return;
    }

    if (category == '-1') {
      return;
    }

    // Create new todo item
    this.tasks.push({
      text,
      checked: false,
      category
    });

    this.initCategories();
  }

  public addNewCategory(): void {
    // Validate form
    let name: string = this.addItemForm.value.newCategory;

    if (!name || (name && name.length < 1)) {
      return;
    }

    this.categories.push({
      name: name.toUpperCase(),
      count: 0
    });

    this.addItemForm.controls.newCategory.reset();
  }

  private initForm(): void {
    this.addItemForm = this.fb.group({
      text: [''],
      category: [-1],
      newCategory: ['']
    });
  }

  private initCategories(): void {
    this.tasks.map((task: TodoItem) => {
      if (this.categories.some((category: Category) => {
        return category.name === task.category;
      })) {
        // If category exists, increase it's count by 1
        this.categories.find((category: Category) => {
          return category.name === task.category;
        }).count++;
      } else {
        // If category doesn't exists, add it and set count to 1
        this.categories.push({
          name: task.category,
          count: 1
        });
      }
    });
  }
}

export type TodoItem = {
  text: string;
  checked: boolean;
  category: string;
};

export type Category = {
  name: string;
  count: number;
};
