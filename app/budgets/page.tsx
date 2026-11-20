"use client";

import React, { useState, useEffect } from "react";
import { INITIAL_BUDGETS } from "@/lib/mock-data";
import { BudgetCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { AppNavigation } from "@/components/AppNavigation";
import { BudgetManager } from "@/components/BudgetManager";
import { Target, PlusCircle, AlertTriangle, CheckCircle2, ShieldCheck, DollarSign } from "lucide-react";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<BudgetCategory[]>(INITIAL_BUDGETS);
  const [newCatName, setNewCatName] = useState("");
  const [newCatAmount, setNewCatAmount] = useState("");
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fintrack_budgets");
      if (stored) setBudgets(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const saveBudgets = (newBudgets: BudgetCategory[]) => {
    setBudgets(newBudgets);
    try {
      localStorage.setItem("fintrack_budgets", JSON.stringify(newBudgets));
    } catch (e) {}
  };

  const handleUpdate = (id: string, newAllocated: number) => {
    saveBudgets(budgets.map((b) => (b.id === id ? { ...b, allocated: newAllocated } : b)));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(newCatAmount);
    if (!newCatName.trim() || isNaN(amountNum) || amountNum <= 0) return;

    const colors = ["#6366f1", "#ec4899", "#8b5cf6", "#06b6d4", "#f59e0b", "#10b981", "#f97316"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCat: BudgetCategory = {
      id: `b-${Date.now()}`,
      name: newCatName.trim(),
      allocated: amountNum,
      spent: 0,
      color: randomColor,
    };

    saveBudgets([...budgets, newCat]);
    setNewCatName("");
    setNewCatAmount("");
    setIsAddCatOpen(false);
  };

  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocated, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const remainingRoom = totalAllocated - totalSpent;
  const overallPercentage = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AppNavigation />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Monthly Budget Targets & Allocations
              </h1>
              <span className="text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                {budgets.length} Categories
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Prevent lifestyle creep by configuring strict spending limits per expense bucket.
            </p>
          </div>

          <button
            onClick={() => setIsAddCatOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Budget Bucket</span>
          </button>
        </div>

        {/* Aggregate Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Total Target Pool</span>
              <Target className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold font-mono text-white">
              {formatCurrency(totalAllocated)}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Consumed Across Buckets</span>
              <DollarSign className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold font-mono text-amber-400">
              {formatCurrency(totalSpent)}{" "}
              <span className="text-xs font-normal text-slate-500">({overallPercentage}%)</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Remaining Monthly Headroom</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div
              className={`text-xl font-bold font-mono ${
                remainingRoom >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {formatCurrency(remainingRoom)}
            </div>
          </div>
        </div>

        {/* Budget Manager Component */}
        <BudgetManager
          budgets={budgets}
          onUpdateBudget={handleUpdate}
        />
      </main>

      {/* Add Category Modal */}
      {isAddCatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Add New Budget Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Travel & Vacations"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Monthly Allowance ($)</label>
                <input
                  type="number"
                  step="50"
                  required
                  placeholder="300"
                  value={newCatAmount}
                  onChange={(e) => setNewCatAmount(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddCatOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500"
                >
                  Create Bucket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
