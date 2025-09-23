
export enum ExpenseCategory {
  Material = 'Material',
  Equipment = 'Equipment',
  Service = 'Service',
  SpareParts = 'Spare Parts',
  Salary = 'Salary',
  Stationary = 'Stationary',
  OfficeEquipment = 'Office Equipment',
  Other = 'Other',
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export interface User {
  id: string;
  email: string;
}
