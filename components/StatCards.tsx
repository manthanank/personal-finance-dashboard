"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, ArrowUpRight, ArrowDownRight, PiggyBank, TrendingUp } from "lucide-react";

interface StatCardsProps {
  balance: number;
  income: number;
  expense: number;
}

export function StatCards({ balance, income, expense }: StatCardsProps) {
  const netSavings = income - expense;
  const savingsRate = income > 0 ? Math.max(0, (netSavings / income) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Net Balance Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Net Balance</span>
          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <DollarSign className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
          {formatCurrency(balance)}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Active Liquidity</span>
        </div>
      </div>

      {/* Monthly Inflow Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Monthly Income</span>
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
          +{formatCurrency(income)}
        </div>
        <div className="mt-2 text-xs text-slate-400">Across salary & side revenue</div>
      </div>

      {/* Monthly Outflow Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Monthly Expenses</span>
          <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ArrowDownRight className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
          -{formatCurrency(expense)}
        </div>
        <div className="mt-2 text-xs text-slate-400">Fixed bills & variable spend</div>
      </div>

      {/* Savings Rate Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Savings Rate</span>
          <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <PiggyBank className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">
          {savingsRate.toFixed(1)}%
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
              style={{ width: `${Math.min(100, savingsRate)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-400 shrink-0">
            {formatCurrency(netSavings)}
          </span>
        </div>
      </div>
    </div>
  );
}

