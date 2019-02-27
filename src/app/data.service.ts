import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private choice = new BehaviorSubject(false);
  deleteChoice = this.choice.asObservable();
  editChoice = this.choice.asObservable();
  constructor() { }
  changeDeleteChoice(choice: boolean) {
    this.choice.next(choice);
  }
  changeEditChoice(choice: boolean) {
    this.choice.next(choice);
  }
}
