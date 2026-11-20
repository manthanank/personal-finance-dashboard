"use client";

import React, { useState, useEffect } from "react";
import { INITIAL_TRANSACTIONS } from "@/lib/mock-data";
import { Transaction } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { AppNavigation } from "@/components/AppNavigation";
import { TransactionTable } from "@/components/TransactionTable";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { CsvImportModal } from "@/components/CsvImportModal";
import {
  Receipt,
  Download,
  Upload,
  PlusCircle,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
  FileSpreadsheet,
} from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCsvOpen, setIsCsvOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fintrack_transactions");
      if (stored) setTransactions(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const saveTransactions = (newTx: Transaction[]) => {
    setTransactions(newTx);
    try {
      localStorage.setItem("fintrack_transactions", JSON.stringify(newTx));
    } catch (e) {}
  };

  const handleAdd = (newTx: Omit<Transaction, "id">) => {
    const tx = { ...newTx, id: `tx-${Date.now()}` };
    saveTransactions([tx, ...transactions]);
  };

  const handleDelete = (id: string) => {
    saveTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleImport = (newRows: Transaction[]) => {
    saveTransactions([...newRows, ...transactions]);
  };

  const handleExportCsv = () => {
    const headers = ["ID", "Date", "Description", "Amount", "Type", "Category", "PaymentMethod"];
    const rows = transactions.map((t) =>
      [t.id, t.date, `"${t.description.replace(/"/g, '""')}"`, t.amount, t.type, `"${t.category}"`, `"${t.paymentMethod}"`].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `fintrack-ledger-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalInflow = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalOutflow = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AppNavigation
        onOpenAddModal={() => setIsAddOpen(true)}
        onOpenCsvModal={() => setIsCsvOpen(true)}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Transaction Ledger Workstation
              </h1>
              <span className="text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                {transactions.length} Total Records
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Audit, search, import, and export all personal financial movements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setIsCsvOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Import CSV</span>
            </button>

            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        {/* Aggregate Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Recorded Inflow</span>
              <ArrowUpRight className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400">
              +{formatCurrency(totalInflow)}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Recorded Outflow</span>
              <ArrowDownRight className="h-4 w-4 text-rose-400" />
            </div>
            <div className="text-xl font-bold font-mono text-rose-400">
              -{formatCurrency(totalOutflow)}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Net Cash Delta</span>
              <TrendingUp className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold font-mono text-white">
              {formatCurrency(totalInflow - totalOutflow)}
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <TransactionTable
          transactions={transactions}
          onDeleteTransaction={handleDelete}
        />
      </main>

      <AddTransactionModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddTransaction={handleAdd}
      />

      <CsvImportModal
        isOpen={isCsvOpen}
        onClose={() => setIsCsvOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}
