import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Employee} from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input()
  employee: Employee;
  @Input()
  employees: Employee[];
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() edited: EventEmitter<string> = new EventEmitter<string>();
  directReportingEmployees: Employee[];
  totalReportingEmployees: number;

  constructor() {
    this.directReportingEmployees = [];
  }

  /**
   * assign the total count of reporting employees to totalReportingEmployees variable
   */
  ngOnInit() {
    if (this.employee) {
      this.totalReportingEmployees = (this.employee.directReports) ? this.employee.directReports.length : 0;
      if (this.employee.directReports && this.employee.directReports.length > 0) {
        this.employee.directReports.forEach(id => {
          this.employees.forEach(emp => {
            if (emp.id === id) { this.directReportingEmployees.push(emp); }
          });
        });
      }
    }

  }

  /**
   * emit edit event
   * @param e carries the id of the employee to edit handler in the parent
   */
  handleEditClick(e) {
    this.edited.emit(e);
  }
  /**
   * emit delete event
   * @param e carries the id of the employee to delete handler in the parent
   */
  handleDeleteClick(e) {
    this.deleted.emit(e);
  }

}
