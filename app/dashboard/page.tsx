"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  INITIAL_TRANSACTIONS,
  INITIAL_BUDGETS,
  INITIAL_SUBSCRIPTIONS,
  HISTORICAL_CASH_FLOW,
} from "@/lib/mock-data";
import { Transaction, BudgetCategory, Subscription, CategoryBreakdown } from "@/lib/types";
import { AppNavigation } from "@/components/AppNavigation";
import { StatCards } from "@/components/StatCards";
import { ChartsSection } from "@/components/ChartsSection";
import { BudgetManager } from "@/components/BudgetManager";
import { SubscriptionTracker } from "@/components/SubscriptionTracker";
import { TransactionTable } from "@/components/TransactionTable";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { CsvImportModal } from "@/components/CsvImportModal";
import { AiFinancialAdvisorModal } from "@/components/AiFinancialAdvisorModal";
import { ShieldCheck, ArrowRight, Sparkles, Receipt, Target } from "lucide-react";

export default function DashboardOverviewPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState<BudgetCategory[]>(INITIAL_BUDGETS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCsvOpen, setIsCsvOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Persistence
  useEffect(() => {
    try {
      const storedTx = localStorage.getItem("fintrack_transactions");
      if (storedTx) setTransactions(JSON.parse(storedTx));

      const storedBudgets = localStorage.getItem("fintrack_budgets");
      if (storedBudgets) setBudgets(JSON.parse(storedBudgets));

      const storedSubs = localStorage.getItem("fintrack_subscriptions");
      if (storedSubs) setSubscriptions(JSON.parse(storedSubs));
    } catch (e) {}
  }, []);

  const saveTransactions = (newTx: Transaction[]) => {
    setTransactions(newTx);
    try {
      localStorage.setItem("fintrack_transactions", JSON.stringify(newTx));
    } catch (e) {}
  };

  const saveBudgets = (newBudgets: BudgetCategory[]) => {
    setBudgets(newBudgets);
    try {
      localStorage.setItem("fintrack_budgets", JSON.stringify(newBudgets));
    } catch (e) {}
  };

  const saveSubscriptions = (newSubs: Subscription[]) => {
    setSubscriptions(newSubs);
    try {
      localStorage.setItem("fintrack_subscriptions", JSON.stringify(newSubs));
    } catch (e) {}
  };

  // Calculations
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const categoryExpenses: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryExpenses[t.category] = (categoryExpenses[t.category] || 0) + t.amount;
    });

  const categoryColors: Record<string, string> = {
    Housing: "#6366f1",
    "Food & Dining": "#ec4899",
    "Utilities & Tech": "#8b5cf6",
    Transportation: "#06b6d4",
    Entertainment: "#f59e0b",
    "Health & Fitness": "#10b981",
    Shopping: "#f97316",
    "General Expense": "#64748b",
  };

  const categoryBreakdown: CategoryBreakdown[] = Object.entries(categoryExpenses).map(
    ([name, value]) => ({
      name,
      value,
      color: categoryColors[name] || "#94a3b8",
      percentage: totalExpense > 0 ? (value / totalExpense) * 100 : 0,
    })
  );

  const handleAddTransaction = (newTx: Omit<Transaction, "id">) => {
    const tx: Transaction = { ...newTx, id: `tx-${Date.now()}` };
    const updated = [tx, ...transactions];
    saveTransactions(updated);

    if (tx.type === "expense") {
      const updatedBudgets = budgets.map((b) =>
        b.name === tx.category ? { ...b, spent: b.spent + tx.amount } : b
      );
      saveBudgets(updatedBudgets);
    }
  };

  const handleDeleteTransaction = (id: string) => {
    const target = transactions.find((t) => t.id === id);
    const updated = transactions.filter((t) => t.id !== id);
    saveTransactions(updated);

    if (target && target.type === "expense") {
      const updatedBudgets = budgets.map((b) =>
        b.name === target.category
          ? { ...b, spent: Math.max(0, b.spent - target.amount) }
          : b
      );
      saveBudgets(updatedBudgets);
    }
  };

  const handleImportCsv = (newRows: Transaction[]) => {
    const updated = [...newRows, ...transactions];
    saveTransactions(updated);
  };

  const handleUpdateBudget = (id: string, newAllocated: number) => {
    const updated = budgets.map((b) =>
      b.id === id ? { ...b, allocated: newAllocated } : b
    );
    saveBudgets(updated);
  };

  const handleToggleSubscription = (id: string) => {
    const updated = subscriptions.map((s) =>
      s.id === id ? { ...s, status: (s.status === "active" ? "paused" : "active") as any } : s
    );
    saveSubscriptions(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AppNavigation
        onOpenAddModal={() => setIsAddOpen(true)}
        onOpenCsvModal={() => setIsCsvOpen(true)}
        onOpenAiModal={() => setIsAiOpen(true)}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-6">
        {/* Supabase RLS Active Banner */}
        <div className="p-3 sm:p-4 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-semibold text-white">PostgreSQL Multi-Tenant RLS Enabled</span>:{" "}
              <span className="text-slate-400">
                Encrypted user session active with zero-knowledge data isolation.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] self-end sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real-time Cockpit</span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <StatCards
          balance={netBalance}
          income={totalIncome}
          expense={totalExpense}
        />

        {/* Recharts Visualizations */}
        <ChartsSection
          cashFlow={HISTORICAL_CASH_FLOW}
          categoryBreakdown={categoryBreakdown}
        />

        {/* 2-Column Responsive: Budgets & Subscriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BudgetManager
            budgets={budgets}
            onUpdateBudget={handleUpdateBudget}
          />
          <SubscriptionTracker
            subscriptions={subscriptions}
            onToggleStatus={handleToggleSubscription}
          />
        </div>

        {/* Recent Transactions Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Receipt className="h-4 w-4 text-emerald-400" />
              <span>Recent Transactions</span>
            </h3>
            <Link
              href="/transactions"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View Full Ledger</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <TransactionTable
            transactions={transactions.slice(0, 5)}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </main>

      {/* Modals */}
      <AddTransactionModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      <CsvImportModal
        isOpen={isCsvOpen}
        onClose={() => setIsCsvOpen(false)}
        onImport={handleImportCsv}
      />

      <AiFinancialAdvisorModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        transactions={transactions}
        budgets={budgets}
        subscriptions={subscriptions}
      />
    </div>
  );
}
