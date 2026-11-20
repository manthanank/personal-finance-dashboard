"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  CheckCircle2,
  PieChart as PieIcon,
  Zap,
  Lock,
  ChevronDown,
  DollarSign,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Star,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function MarketingLandingPage() {
  // Interactive Compound Interest Calculator State
  const [initialAmount, setInitialAmount] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(10);

  // Billing Toggle State
  const [isAnnual, setIsAnnual] = useState(true);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculate compound interest
  const months = years * 12;
  const monthlyRate = annualReturn / 100 / 12;
  const futureValueInitial = initialAmount * Math.pow(1 + monthlyRate, months);
  const futureValueContributions =
    monthlyRate > 0
      ? monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : monthlyContribution * months;
  const totalWealth = Math.round(futureValueInitial + futureValueContributions);
  const totalPrincipal = initialAmount + monthlyContribution * months;
  const totalInterest = Math.max(0, totalWealth - totalPrincipal);

  const faqs = [
    {
      q: "How does Supabase Row Level Security (RLS) protect my financial data?",
      a: "Unlike traditional centralized databases where application code must remember to add WHERE user_id = ? to every query, Supabase RLS enforces multi-tenant privacy at the PostgreSQL database kernel level. Even in the event of an application vulnerability, the database engine physically rejects queries trying to access other users' rows.",
    },
    {
      q: "What bank CSV formats are supported?",
      a: "FinTrack features an adaptive stream parser powered by PapaParse that automatically maps standard columns: Date, Description, Amount, Category, and Payment Method. It seamlessly supports Chase, Bank of America, Wells Fargo, Apple Card, and European SEPA statements.",
    },
    {
      q: "Can I run FinTrack completely offline without cloud accounts?",
      a: "Yes! FinTrack includes full local storage parity. You can track transactions, import CSV statements, adjust budget targets, and consult the FinAI advisor completely in your browser without entering any credentials.",
    },
    {
      q: "Does FinAI train machine learning models on my private transactions?",
      a: "Never. All AI financial analysis is performed through isolated, stateless inference with zero data retention. Your financial records are never utilized for model training.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Marketing Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">FinTrack</span>
              <span className="hidden sm:inline-block text-[10px] text-emerald-400 font-mono ml-2 border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.2 rounded-full">
                SaaS v2.4
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#calculator" className="hover:text-white transition-colors">Wealth Calculator</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        {/* Glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-600/15 to-teal-600/15 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Zero-Knowledge Row Level Security & Financial AI</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Command Your Cash Flow, Automate Budgets &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Build Lasting Wealth
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            FinTrack combines <strong>Supabase Row Level Security (RLS)</strong>, dynamic Recharts analytics, drag-and-drop CSV bank statement ingestion, and AI financial insights into one cohesive wealth operating system.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-emerald-600/25 transition-all"
            >
              <span>Open Live Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all"
            >
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>Simulate Wealth Growth</span>
            </a>
          </div>

          {/* Social Proof Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-slate-400 border-t border-slate-800/80 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>PostgreSQL RLS Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>Sub-15ms Latency</span>
            </div>
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-purple-400" />
              <span>Instant CSV Ingestion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Wealth Growth Calculator */}
      <section id="calculator" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <TrendingUp className="h-4 w-4" />
              <span>Interactive Model</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Compound Wealth Simulator</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Adjust your monthly contributions and expected return to forecast long-term compounding.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders (Left 7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-300">Initial Investment</span>
                  <span className="font-mono text-emerald-400 font-bold">{formatCurrency(initialAmount)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-300">Monthly Contribution</span>
                  <span className="font-mono text-emerald-400 font-bold">{formatCurrency(monthlyContribution)}/mo</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">Annual Return</span>
                    <span className="font-mono text-emerald-400 font-bold">{annualReturn}%</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="0.5"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">Horizon</span>
                    <span className="font-mono text-emerald-400 font-bold">{years} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Results Display (Right 5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 text-center">
              <div>
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
                  Projected Wealth in {years} Years
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mt-1">
                  {formatCurrency(totalWealth)}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Total Principal Contributed:</span>
                  <span className="font-mono text-white">{formatCurrency(totalPrincipal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Compound Interest Growth:</span>
                  <span className="font-mono text-emerald-400 font-bold">+{formatCurrency(totalInterest)}</span>
                </div>
              </div>

              <Link
                href="/dashboard"
                className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20"
              >
                <span>Track This In Dashboard</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dive Grid */}
      <section id="features" className="py-16 md:py-24 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Enterprise Architecture for Everyday Wealth
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Engineered with modern full-stack primitives to eliminate latency, safeguard personal records, and guide spending.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Row Level Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                PostgreSQL kernel-level access enforcement ensures that your financial ledgers are cryptographically insulated from all other users.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Upload className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">CSV Stream Ingestion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drag-and-drop bank statements. PapaParse streaming extracts rows, normalizes dates, and infers spending categories in real time.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Recharts Visualizations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cash flow velocity curves, spending distribution donut charts, and monthly variance meters optimized for sub-10ms render cycles.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">FinAI Context Advisor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contextual AI advisor monitors your actual transactions to flag recurring subscription creep, budget threshold overruns, and savings targets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-white">Transparent SaaS Pricing</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Start free with local storage or scale to encrypted multi-device Supabase cloud sync.
            </p>

            {/* Toggle */}
            <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-full border border-slate-800 bg-slate-900 text-xs">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  !isAnnual ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isAnnual ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full font-mono">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Community Edition</h3>
                <p className="text-xs text-slate-400 mt-1">Full offline browser storage</p>
                <div className="text-3xl font-extrabold text-white font-mono my-4">$0</div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Unlimited Transactions & Budgets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>CSV Statement Drag & Drop</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Standard Recharts Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Local FinAI Advisor Heuristics</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="mt-6 w-full text-center py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-xs font-semibold text-white transition-all"
              >
                Start Free Instantly
              </Link>
            </div>

            {/* Pro Wealth */}
            <div className="rounded-2xl border-2 border-emerald-500/80 bg-slate-900 p-6 flex flex-col justify-between relative shadow-xl shadow-emerald-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-0.5 rounded-full">
                Most Popular
              </span>

              <div>
                <h3 className="text-base font-bold text-white">Pro Wealth</h3>
                <p className="text-xs text-slate-400 mt-1">Supabase RLS Cloud Sync & Advanced AI</p>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono my-4">
                  {isAnnual ? "$7" : "$9"}
                  <span className="text-xs text-slate-400 font-normal font-sans"> / month</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Everything in Community</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Encrypted Multi-Device Supabase Sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Unlimited FinAI Context Guidance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Automated Recurring Bill Detectors</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="mt-6 w-full text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 transition-all"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Family Office */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Family Office</h3>
                <p className="text-xs text-slate-400 mt-1">Multi-account governance & audits</p>
                <div className="text-3xl font-extrabold text-white font-mono my-4">
                  {isAnnual ? "$15" : "$19"}
                  <span className="text-xs text-slate-400 font-normal font-sans"> / month</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Everything in Pro Wealth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Up to 6 Family / Organization Members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Automated Monthly PDF Reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Priority 24/7 Concierge Support</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="mt-6 w-full text-center py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-xs font-semibold text-white transition-all"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-16 md:py-24 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Clear answers regarding security, data retention, and integration.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-white hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      openFaq === idx ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 border-t border-slate-800/80 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-white">Ready to Take Command of Your Finances?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Experience zero-latency cash flow analytics, smart budget meters, and automated CSV statement parsing.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-emerald-600/25"
            >
              <span>Launch Dashboard Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} FinTrack SaaS. Built by Manthan Ank.</div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-slate-300">Dashboard</Link>
            <Link href="/transactions" className="hover:text-slate-300">Transactions</Link>
            <Link href="/budgets" className="hover:text-slate-300">Budgets</Link>
            <Link href="/analytics" className="hover:text-slate-300">Analytics</Link>
            <a href="https://github.com/manthanank/personal-finance-dashboard" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
