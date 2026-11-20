"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Wallet,
  Menu,
  X,
  Upload,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  User,
  LogOut,
  LogIn,
  Repeat,
  DollarSign,
} from "lucide-react";

interface NavbarProps {
  onOpenAddModal: () => void;
  onOpenCsvModal: () => void;
  onOpenAiModal: () => void;
}

export function Navbar({ onOpenAddModal, onOpenCsvModal, onOpenAiModal }: NavbarProps) {
  const { user, isAuthenticated, login, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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

        {/* Desktop Quick Actions & User Profile */}
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

          {/* User Session Dropdown */}
          <div className="relative ml-2">
            {isAuthenticated && user ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-700 transition cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500/50"
                />
                <div className="hidden lg:block text-left text-xs">
                  <div className="font-medium text-slate-200 leading-tight flex items-center gap-1.5">
                    <span>{user.name}</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">{user.netWorth}</div>
                </div>
              </button>
            ) : (
              <button
                onClick={() => login("david@wealthpulse.app", "David Chen")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Dropdown Menu */}
            {userDropdownOpen && user && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                  <div className="font-semibold text-sm text-white">{user.name}</div>
                  <div className="text-xs text-slate-400 truncate">{user.email}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Role: {user.role}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      switchRole();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-emerald-300 hover:bg-slate-800/60 rounded-xl transition cursor-pointer"
                  >
                    <Repeat className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Switch to {user.role === "Wealth Advisor" ? "Account Holder" : "Wealth Advisor"}</span>
                  </button>

                  <div className="border-t border-slate-800/80 my-1" />

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
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