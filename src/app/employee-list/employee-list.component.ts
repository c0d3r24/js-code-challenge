import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {DataService} from './../data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee;
  errorMessage: string;
  // choice: boolean;
  @Output()
  showModal: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService, private data: DataService) {}

  ngOnInit(): void {
    // this.employeeService.getAll()
    //   .pipe(
    //     reduce((emps, e: Employee) => emps.concat(e), []),
    //     map(emps => this.employees = emps),
    //     catchError(this.handleError.bind(this))
    //   ).subscribe();
    this.data.deleteChoice.subscribe(choice => this.deleteSelectedRecord( choice));
    this.data.editChoice.subscribe(choice => this.editSelectedRecord(choice));
    this.loadEmployees();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
  /**
   * Handles the edit action initiated by a user.
   * @param id of the user to edit details
   */
  handleEdit(id: number) {
    this.selectedEmployee = this.employees
      .filter(emp => {if (emp.id === id) { return emp; }})[0];
    this.showModal.emit({dialogToShow: 'edit', employee: this.selectedEmployee});
  }

  /**
  * Handles the delete action initiated by a user.
  * @param id of the record to delete
  */
  handleDelete(id: number) {
    this.selectedEmployee = this.employees
      .filter(emp => {if (emp.id === id) { return emp; }})[0];
    if ( this.selectedEmployee ) {
      this.showModal.emit({dialogToShow: 'delete', employee: this.selectedEmployee});
    }
  }

  /**
   * delete selected record
   */
  deleteSelectedRecord(choice: boolean) {
    if ( choice === true ) {
      this.employeeService.remove(this.selectedEmployee).subscribe(_ => {
        this.loadEmployees();
        this.closeModal.emit();
      });
    }
  }

  /**
   * edit selected record
   */
  editSelectedRecord( choice: boolean) {
    if (choice === true) {
      this.employeeService.save(this.selectedEmployee).subscribe(_ => {
        this.loadEmployees();
        this.closeModal.emit();
      });
    }
  }
  /**
   * Load data
   */
  loadEmployees() {
    this.employeeService.getAll()
    .pipe(
      reduce((emps, e: Employee) => emps.concat(e), []),
      map(emps => this.employees = emps),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }
}


