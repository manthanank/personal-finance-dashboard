"use client";

import React, { useState } from "react";
import { BudgetCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Target, AlertTriangle, CheckCircle2, Edit3, X } from "lucide-react";

interface BudgetManagerProps {
  budgets: BudgetCategory[];
  onUpdateBudget: (id: string, newAllocated: number) => void;
}

export function BudgetManager({ budgets, onUpdateBudget }: BudgetManagerProps) {
  const [editingBudget, setEditingBudget] = useState<BudgetCategory | null>(null);
  const [newAmount, setNewAmount] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBudget) return;
    const amountNum = parseFloat(newAmount);
    if (!isNaN(amountNum) && amountNum > 0) {
      onUpdateBudget(editingBudget.id, amountNum);
    }
    setEditingBudget(null);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Target className="h-4 w-4 text-indigo-400" />
            <span>Monthly Budget Targets</span>
          </h3>
          <p className="text-xs text-slate-400">Category limits and alert thresholds</p>
        </div>
      </div>

      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = Math.min(100, Math.round((budget.spent / (budget.allocated || 1)) * 100));
          const isOverBudget = budget.spent > budget.allocated;
          const isNearLimit = !isOverBudget && percentage >= 85;

          return (
            <div key={budget.id} className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: budget.color }} />
                  <span className="font-semibold text-slate-200">{budget.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-300">
                    {formatCurrency(budget.spent)}{" "}
                    <span className="text-slate-500">/ {formatCurrency(budget.allocated)}</span>
                  </span>

                  <button
                    onClick={() => {
                      setEditingBudget(budget);
                      setNewAmount(budget.allocated.toString());
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Adjust Budget Target"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOverBudget
                      ? "bg-rose-500"
                      : isNearLimit
                      ? "bg-amber-400"
                      : "bg-indigo-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Status Note */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-400">{percentage}% utilized</span>
                {isOverBudget ? (
                  <span className="flex items-center gap-1 text-rose-400 font-medium">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Over budget by {formatCurrency(budget.spent - budget.allocated)}</span>
                  </span>
                ) : isNearLimit ? (
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Nearing limit (85%+)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>On target</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Budget Modal */}
      {editingBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h4 className="text-sm font-bold text-white">Adjust {editingBudget.name} Budget</h4>
              <button onClick={() => setEditingBudget(null)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1.5">Monthly Limit ($)</label>
                <input
                  type="number"
                  step="10"
                  required
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setEditingBudget(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-900 border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500"
                >
                  Save Limit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

