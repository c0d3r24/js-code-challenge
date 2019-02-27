import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {Employee} from './employee';
import {DataService} from './data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input()
  dialogToShow: String;
  @Input()
  employee: Employee;
  @Output()
  closeModalResponse: EventEmitter<void> = new EventEmitter<void>();
  showDeleteConfirmation: boolean;
  showEditDialog: boolean;
  constructor(private data: DataService) { }
  /**
   * return user's choice
   * @param choice 'true' if user select to delete else false
   */
  handleDeleteResponse(choice: boolean) {
    if ( choice ) {
      this.data.changeDeleteChoice(choice);
      return;
    }
    this.closeModalResponse.emit();
  }

  /**
   * return user's choice
   * @param choice 'true' if user select to update user's information 'false' otherwise
   */
  handleEditResponse(choice: boolean) {
    if ( choice ) {
      this.data.changeEditChoice(choice);
      return;
    }
    this.closeModalResponse.emit();
  }

  /**
   * decision which dialog to show
   */
  ngOnInit() {
    // this.data.currentChoice.subscribe(choice => this.choice = choice)
    switch (this.dialogToShow) {
      case 'delete':
        this.showDeleteConfirmation = !this.showDeleteConfirmation;
        break;
      case 'edit':
        this.showEditDialog = !this.showEditDialog;
        break;
    }
  }
}
