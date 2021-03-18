import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public showAddTodoItemModal = false;
  public addItemForm: FormGroup;
  public faTimes = faTimes;
  public faPlus = faPlus;

  private tasks: TodoItem[] = [];
  private categories: Category[] = [];
  private taskCount = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Make some initial todo items
    this.pushTodoItem('Test todo item 1', false, 'GENERAL');
    this.pushTodoItem('Test todo item 3', false, 'GENERAL');
    this.pushTodoItem('Test todo item 2', false, 'MODULE 1');

    this.updateCategories();
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
    this.addItemForm.reset({
      category: [-1]
    });
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
    this.pushTodoItem(text, false, category);

    this.updateCategories();

    this.showAddTodoItemModal = false;
  }

  public addNewCategory(): void {
    // Validate form
    let name: string = this.addItemForm.value.newCategory;

    if (!name || (name && name.length < 1)) {
      return;
    }

    // Check not duplicate
    if (this.categories.some((category: Category) => {
      return category.name === name.toUpperCase();
    })) {
      this.addItemForm.controls.newCategory.reset();
      return;
    }

    this.categories.push({
      name: name.toUpperCase(),
      count: 0
    });

    this.addItemForm.controls.newCategory.reset();
    this.addItemForm.controls.category.setValue(name.toUpperCase());
  }

  public deleteTodoItem(id: number): void {
    // Find index of item to remove
    let index: number = this.tasks.findIndex((task: TodoItem) => {
      return task.id === id;
    });

    this.tasks.splice(index, 1);

    this.updateCategories();
  }

  private initForm(): void {
    this.addItemForm = this.fb.group({
      text: [''],
      category: [-1],
      newCategory: ['']
    });
  }

  private pushTodoItem(text: string, checked: boolean, category: string): void {
    this.tasks.push({
      text,
      checked,
      category,
      id: this.taskCount++
    });
  }

  private updateCategories(): void {
    this.categories = [];

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
  id: number;
};

export type Category = {
  name: string;
  count: number;
};
