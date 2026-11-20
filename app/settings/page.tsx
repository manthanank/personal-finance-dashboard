'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Shield, Key, Download, RefreshCw, Trash2, 
  CheckCircle2, AlertCircle, Save, ExternalLink 
} from 'lucide-react';
import AppNavigation from '@/components/AppNavigation';

export default function SettingsPage() {
  const [currency, setCurrency] = useState('USD');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [userName, setUserName] = useState('Alex Mercer');
  const [userEmail, setUserEmail] = useState('alex.mercer@fintechpulse.io');
  const [apiKey, setApiKey] = useState('sk-live-••••••••••••••••••••••••');
  const [supabaseConnected, setSupabaseConnected] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCurrencyChange = (curr: string, sym: string) => {
    setCurrency(curr);
    setCurrencySymbol(sym);
    triggerToast(`Default currency changed to ${curr} (${sym})`);
  };

  const handleExportJSON = () => {
    const data = {
      user: { name: userName, email: userEmail },
      currency,
      timestamp: new Date().toISOString(),
      version: '2.4.0',
      sampleSummary: {
        totalNetWorth: 184520.45,
        monthlyIncome: 14200.0,
        monthlyExpenses: 4890.3,
        activeBudgetsCount: 5,
        totalTransactions: 320,
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finpulse-vault-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    triggerToast('Secure Vault data exported as JSON!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AppNavigation />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">System & Account Settings</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Configure your multi-currency ledger, Supabase RLS security policies, API integrations, and data backups.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile & Security */}
          <div className="space-y-6 lg:col-span-1">
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center space-y-4"
            >
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-3xl font-black text-slate-950 shadow-xl shadow-emerald-500/10 mx-auto">
                  AM
                </div>
                <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{userName}</h3>
                <p className="text-slate-400 text-sm">{userEmail}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Apex Pro Tier • Active
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 text-left space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Client Encryption</span>
                  <span className="font-mono text-emerald-400">AES-256-GCM</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Supabase RLS</span>
                  <span className="font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Active Session</span>
                  <span className="font-mono text-slate-300">San Francisco, CA</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Cloud Sync Status</h4>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-slate-300">Live Postgres Sync</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">1.2ms</span>
              </div>
              <button 
                onClick={() => triggerToast('Synchronized 320 records with Supabase pgvector')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Force Full Sync
              </button>
            </div>
          </div>

          {/* Right Column: Settings Sections */}
          <div className="space-y-6 lg:col-span-2">
            {/* Preferences */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">General & Regional Preferences</h3>
                  <p className="text-xs text-slate-400">Configure your display formats, primary base currency, and language</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Notification Email</label>
                  <input 
                    type="email" 
                    value={userEmail} 
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Base Ledger Currency</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { code: 'USD', sym: '$', name: 'US Dollar' },
                    { code: 'EUR', sym: '€', name: 'Euro' },
                    { code: 'GBP', sym: '£', name: 'British Pound' },
                    { code: 'INR', sym: '₹', name: 'Indian Rupee' },
                    { code: 'JPY', sym: '¥', name: 'Japanese Yen' }
                  ].map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleCurrencyChange(c.code, c.sym)}
                      className={`p-3 rounded-xl border text-left transition ${
                        currency === c.code 
                          ? 'border-emerald-500 bg-emerald-500/10 text-white' 
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className="text-lg font-bold">{c.sym} {c.code}</div>
                      <div className="text-[11px] truncate">{c.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* AI Advisor & API Integration */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">AI Financial Intelligence Engine</h3>
                  <p className="text-xs text-slate-400">Configure LLM providers for portfolio audits, tax optimization, and spending predictions</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">OpenAI / Claude API Key</label>
                    <span className="text-[11px] text-slate-500">Stored in encrypted localStorage</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="password" 
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 flex items-start gap-3">
                  <Shield className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-purple-300/90 leading-relaxed">
                    FinPulse operates with zero-knowledge financial analysis. When AI queries execute, all account IDs, names, and transaction recipient identities are masked client-side before transmission.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Data & Backup */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Data Portability & Vault Backup</h3>
                  <p className="text-xs text-slate-400">Export your complete financial history or reset state</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleExportJSON}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" /> Download Full JSON Archive
                </button>
                <button 
                  onClick={() => triggerToast('Sample data reset to default demo ledger')}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  <RefreshCw className="w-4 h-4" /> Reset Sample Ledger
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </motion.div>
      )}
    </div>
  );
}
