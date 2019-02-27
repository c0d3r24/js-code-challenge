export class Employee {
  compensation: number;
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  directReports?: Array<number>;
}
