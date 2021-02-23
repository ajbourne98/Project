import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() clickOutside = new EventEmitter<void>();

  public faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  public onClickOutside(): void {
    this.clickOutside.emit();
  }
}
