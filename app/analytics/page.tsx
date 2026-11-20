"use client";

import React, { useState, useEffect } from "react";
import { INITIAL_TRANSACTIONS, HISTORICAL_CASH_FLOW } from "@/lib/mock-data";
import { Transaction, CategoryBreakdown } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { AppNavigation } from "@/components/AppNavigation";
import { ChartsSection } from "@/components/ChartsSection";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, TrendingUp, PiggyBank, Flame, ShieldAlert } from "lucide-react";

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem("fintrack_transactions");
      if (stored) setTransactions(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : "0";
  const dailyBurn = (totalExpense / 30).toFixed(2);

  // Category breakdown
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AppNavigation />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Deep-Dive Financial Analytics
              </h1>
              <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                Time-Series Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Analyze spending velocity curves, monthly savings variance, and burn rate metrics.
            </p>
          </div>
        </div>

        {/* Velocity Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Savings Rate</span>
              <PiggyBank className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">{savingsRate}%</div>
            <span className="text-[11px] text-slate-500">Benchmark: 20%+ target</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Daily Burn Rate</span>
              <Flame className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-amber-400">${dailyBurn}/day</div>
            <span className="text-[11px] text-slate-500">Average daily cash outflow</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Monthly Surplus</span>
              <TrendingUp className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-cyan-400">{formatCurrency(netSavings)}</div>
            <span className="text-[11px] text-slate-500">Liquidity added this cycle</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Expense Categories</span>
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-purple-400">
              {categoryBreakdown.length} Buckets
            </div>
            <span className="text-[11px] text-slate-500">Tracked in active ledger</span>
          </div>
        </div>

        {/* Primary Area & Donut Charts */}
        <ChartsSection
          cashFlow={HISTORICAL_CASH_FLOW}
          categoryBreakdown={categoryBreakdown}
        />

        {/* Monthly Net Savings Bar Chart */}
        {isMounted && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-emerald-400" />
                  <span>Monthly Net Surplus History</span>
                </h3>
                <p className="text-xs text-slate-400">Historical capital added to investment reserves</p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HISTORICAL_CASH_FLOW} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      borderColor: "#334155",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                    }}
                    formatter={(val: any) => [formatCurrency(Number(val)), "Net Surplus"]}
                  />
                  <Bar dataKey="savings" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Spending Category Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
          <h3 className="text-sm font-bold text-white mb-3">Category Spending Rankings</h3>
          <div className="divide-y divide-slate-800/60 text-xs">
            {categoryBreakdown.map((cat, idx) => (
              <div key={cat.name} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-500 text-[11px]">#{idx + 1}</span>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-semibold text-slate-200">{cat.name}</span>
                </div>
                <div className="flex items-center gap-4 font-mono">
                  <span className="text-slate-400">{cat.percentage.toFixed(1)}%</span>
                  <span className="font-bold text-white">{formatCurrency(cat.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

