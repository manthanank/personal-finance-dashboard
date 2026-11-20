"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wallet,
  LayoutDashboard,
  Receipt,
  Target,
  BarChart3,
  Settings,
  Sparkles,
  Upload,
  PlusCircle,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface AppNavigationProps {
  onOpenAddModal?: () => void;
  onOpenCsvModal?: () => void;
  onOpenAiModal?: () => void;
}

export function AppNavigation({
  onOpenAddModal,
  onOpenCsvModal,
  onOpenAiModal,
}: AppNavigationProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: Receipt },
    { name: "Budgets", href: "/budgets", icon: Target },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-white text-base tracking-tight flex items-center gap-1.5">
                  <span>FinTrack</span>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded-full">
                    SaaS PRO
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">Personal Wealth Suite</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-slate-900 border border-slate-700/80 text-emerald-400 shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenAiModal && (
              <button
                onClick={onOpenAiModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-medium transition-all cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span>Ask FinAI</span>
              </button>
            )}

            {onOpenCsvModal && (
              <button
                onClick={onOpenCsvModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium transition-all cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5 text-slate-400" />
                <span>Import CSV</span>
              </button>
            )}

            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Add Entry</span>
              </button>
            )}

            <Link
              href="/"
              className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-300 px-2 py-1"
            >
              <span>Landing Page</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className="p-2 rounded-xl bg-emerald-600 text-white"
                aria-label="Add Transaction"
              >
                <PlusCircle className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${
                  isActive
                    ? "bg-slate-900 border border-slate-800 text-emerald-400 font-bold"
                    : "text-slate-300 hover:bg-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-800 space-y-2">
            {onOpenCsvModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCsvModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 text-xs font-medium"
              >
                <Upload className="h-4 w-4 text-slate-400" />
                <span>Import Bank CSV</span>
              </button>
            )}
            {onOpenAiModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium"
              >
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>Ask FinAI</span>
              </button>
            )}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-mono text-slate-400"
            >
              <span>Back to Public Product Tour</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default AppNavigation;
