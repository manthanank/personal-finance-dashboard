"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Upload, X, FileText, CheckCircle2, Download, AlertCircle } from "lucide-react";

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (newTransactions: Transaction[]) => void;
}

export function CsvImportModal({ isOpen, onClose, onImport }: CsvImportModalProps) {
  const [parsedRows, setParsedRows] = useState<Transaction[]>([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const sampleCsvContent = `Date,Description,Amount,Type,Category,PaymentMethod
2026-11-17,Target Essentials,64.20,expense,Shopping,Debit Card
2026-11-14,Consulting Milestone,1200.00,income,Salary / Freelance,Bank Transfer
2026-11-11,Local Coffee Roasters,14.50,expense,Food & Dining,Apple Pay
2026-11-09,Shell Gas Station,45.00,expense,Transportation,Credit Card
2026-11-04,Netflix Standard,15.49,expense,Entertainment,Credit Card`;

  const handleDownloadSample = () => {
    const blob = new Blob([sampleCsvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "bank-statement-template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError("");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const rows: Transaction[] = results.data.map((row: any, idx: number) => {
            const rawAmount = parseFloat(
              String(row.Amount || row.amount || row.Total || "0").replace(/[^0-9.-]+/g, "")
            );
            const rawType = String(row.Type || row.type || "").toLowerCase();
            const type = rawType.includes("inc") || rawAmount > 0 && !rawType.includes("exp") ? "income" : "expense";

            return {
              id: `csv-${Date.now()}-${idx}`,
              date: row.Date || row.date || new Date().toISOString().split("T")[0],
              description: row.Description || row.description || "Imported Transaction",
              amount: Math.abs(rawAmount) || 10.0,
              type: type,
              category: row.Category || row.category || (type === "income" ? "Salary / Freelance" : "General Expense"),
              paymentMethod: row.PaymentMethod || row.paymentMethod || "Imported Statement",
            };
          });

          if (rows.length === 0) {
            setError("No valid transaction rows found in the CSV file.");
          } else {
            setParsedRows(rows);
          }
        } catch (err) {
          setError("Failed to parse CSV format. Please verify column headers.");
        }
      },
      error: () => {
        setError("Error reading CSV file.");
      },
    });
  };

  const handleConfirmImport = () => {
    if (parsedRows.length > 0) {
      onImport(parsedRows);
      setParsedRows([]);
      setFileName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Upload className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Import Bank Statement (CSV)</h3>
              <p className="text-xs text-slate-400">Stream CSV parser with automated categorization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* File Dropzone */}
        {parsedRows.length === 0 ? (
          <div className="space-y-4">
            <label className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-900/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
              <FileText className="h-10 w-10 text-indigo-400 mb-2" />
              <span className="text-sm font-semibold text-white">
                Choose CSV Bank File or Drag & Drop
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Standard headers supported: Date, Description, Amount, Category
              </span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-slate-400">Need a test file format?</span>
              <button
                type="button"
                onClick={handleDownloadSample}
                className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Bank Template CSV</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-white font-semibold truncate max-w-xs">{fileName}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{parsedRows.length} rows parsed</span>
              </span>
            </div>

            {/* Table Preview */}
            <div className="max-h-48 overflow-y-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 sticky top-0 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2">Date</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Category</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {parsedRows.slice(0, 5).map((row, i) => (
                    <tr key={i} className="hover:bg-slate-900/30">
                      <td className="p-2 text-slate-400">{row.date}</td>
                      <td className="p-2 text-slate-200 truncate max-w-xs font-sans">{row.description}</td>
                      <td className="p-2 text-slate-400">{row.category}</td>
                      <td className={`p-2 text-right font-bold ${row.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {formatCurrency(row.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {parsedRows.length > 5 && (
              <p className="text-[11px] text-slate-500 font-mono text-center">
                + {parsedRows.length - 5} additional transactions will be imported
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setParsedRows([]);
                  setFileName("");
                }}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white border border-slate-800"
              >
                Clear & Re-upload
              </button>
              <button
                type="button"
                onClick={handleConfirmImport}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20"
              >
                Confirm & Import {parsedRows.length} Rows
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

