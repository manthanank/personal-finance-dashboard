export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  paymentMethod: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string;
  category: string;
  status: "active" | "paused";
}

export interface CashFlowPoint {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export interface CategoryBreakdown {
  name: string;
  value: number;
  color: string;
  percentage: number;
}
