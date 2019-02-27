import {Component} from '@angular/core';
import { Employee } from './employee';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  showModal = false;
  dialogToShow: String;
  employee: Employee;

  showMainModal({dialogToShow, employee}) {
    console.log(employee);
    this.showModal = true;
    this.dialogToShow = dialogToShow;
    this.employee = employee;
  }
  closeModal() {
    this.showModal = false;
  }
}
