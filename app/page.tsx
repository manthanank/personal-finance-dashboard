"use client";

import React, { useState, useEffect } from "react";
import {
  INITIAL_TRANSACTIONS,
  INITIAL_BUDGETS,
  INITIAL_SUBSCRIPTIONS,
  HISTORICAL_CASH_FLOW,
} from "@/lib/mock-data";
import { Transaction, BudgetCategory, Subscription, CategoryBreakdown } from "@/lib/types";
import { Navbar } from "@/components/Navbar";
import { StatCards } from "@/components/StatCards";
import { ChartsSection } from "@/components/ChartsSection";
import { BudgetManager } from "@/components/BudgetManager";
import { SubscriptionTracker } from "@/components/SubscriptionTracker";
import { TransactionTable } from "@/components/TransactionTable";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { CsvImportModal } from "@/components/CsvImportModal";
import { AiFinancialAdvisorModal } from "@/components/AiFinancialAdvisorModal";
import { Sparkles, ShieldCheck, Database, Info } from "lucide-react";

export default function FinanceDashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState<BudgetCategory[]>(INITIAL_BUDGETS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCsvOpen, setIsCsvOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const storedTx = localStorage.getItem("fintrack_transactions");
      if (storedTx) setTransactions(JSON.parse(storedTx));

      const storedBudgets = localStorage.getItem("fintrack_budgets");
      if (storedBudgets) setBudgets(JSON.parse(storedBudgets));

      const storedSubs = localStorage.getItem("fintrack_subscriptions");
      if (storedSubs) setSubscriptions(JSON.parse(storedSubs));
    } catch (e) {
      // Fallback silently to mock state
    }
  }, []);

  // Save changes
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

  // Category breakdown calculation
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

  // Handlers
  const handleAddTransaction = (newTx: Omit<Transaction, "id">) => {
    const tx: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
    };
    const updated = [tx, ...transactions];
    saveTransactions(updated);

    // Update budget spent if expense
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

    // Decrement budget spent if it was an expense
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

    // Update corresponding budgets
    const budgetMap: Record<string, number> = {};
    newRows
      .filter((r) => r.type === "expense")
      .forEach((r) => {
        budgetMap[r.category] = (budgetMap[r.category] || 0) + r.amount;
      });

    const updatedBudgets = budgets.map((b) => ({
      ...b,
      spent: b.spent + (budgetMap[b.name] || 0),
    }));
    saveBudgets(updatedBudgets);
  };

  const handleUpdateBudget = (id: string, newAllocated: number) => {
    const updatedBudgets = budgets.map((b) =>
      b.id === id ? { ...b, allocated: newAllocated } : b
    );
    saveBudgets(updatedBudgets);
  };

  const handleToggleSubscription = (id: string) => {
    const updated = subscriptions.map((s) =>
      s.id === id ? { ...s, status: (s.status === "active" ? "paused" : "active") as any } : s
    );
    saveSubscriptions(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        onOpenAddModal={() => setIsAddOpen(true)}
        onOpenCsvModal={() => setIsCsvOpen(true)}
        onOpenAiModal={() => setIsAiOpen(true)}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-6">
        {/* Supabase Status Banner */}
        <div className="p-3 sm:p-4 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-semibold text-white">Database Isolation Active</span>:{" "}
              <span className="text-slate-400">
                PostgreSQL schema configured with Row Level Security (RLS) policies.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto text-slate-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Local & Cloud Parity Mode</span>
          </div>
        </div>

        {/* 4 Stat Metric Cards */}
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

        {/* Full-Width Transactions Ledger */}
        <TransactionTable
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </main>

      {/* Floating Mobile AI Trigger */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button
          onClick={() => setIsAiOpen(true)}
          className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40"
          aria-label="Ask FinAI"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      </div>

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

