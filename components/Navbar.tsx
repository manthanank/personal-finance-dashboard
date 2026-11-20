"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Menu,
  X,
  Upload,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface NavbarProps {
  onOpenAddModal: () => void;
  onOpenCsvModal: () => void;
  onOpenAiModal: () => void;
}

export function Navbar({ onOpenAddModal, onOpenCsvModal, onOpenAiModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-white text-base tracking-tight flex items-center gap-2">
              <span>FinTrack</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="h-3 w-3" />
                <span>Supabase RLS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400">Personal Wealth & Budget Engine</p>
          </div>
        </div>

        {/* Desktop Quick Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenCsvModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium transition-all cursor-pointer"
          >
            <Upload className="h-3.5 w-3.5 text-indigo-400" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={onOpenAiModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-medium transition-all cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Ask FinAI</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenAddModal}
            className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm"
            aria-label="Add Transaction"
          >
            <PlusCircle className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-2">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAddModal();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Transaction</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCsvModal();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 text-sm font-medium"
          >
            <Upload className="h-4 w-4 text-indigo-400" />
            <span>Import CSV Statement</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAiModal();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Financial AI Assistant</span>
          </button>
        </div>
      )}
    </header>
  );
}

