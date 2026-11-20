"use client";

import React from "react";
import { Subscription } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CreditCard, Calendar, PauseCircle, PlayCircle, CheckCircle } from "lucide-react";

interface SubscriptionTrackerProps {
  subscriptions: Subscription[];
  onToggleStatus: (id: string) => void;
}

export function SubscriptionTracker({
  subscriptions,
  onToggleStatus,
}: SubscriptionTrackerProps) {
  const activeSubs = subscriptions.filter((s) => s.status === "active");
  const monthlyTotal = activeSubs.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-purple-400" />
            <span>Recurring Subscriptions</span>
          </h3>
          <p className="text-xs text-slate-400">Scheduled services & monthly overhead</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Total Commitment</div>
          <div className="text-sm font-bold font-mono text-purple-400">
            {formatCurrency(monthlyTotal)}/mo
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {subscriptions.map((sub) => {
          const isActive = sub.status === "active";

          return (
            <div
              key={sub.id}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                isActive
                  ? "border-slate-800/80 bg-slate-950/60"
                  : "border-slate-800/40 bg-slate-950/30 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 text-white ${
                    isActive ? "bg-purple-600/30 border border-purple-500/40" : "bg-slate-800"
                  }`}
                >
                  <CreditCard className="h-4 w-4 text-purple-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{sub.name}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{sub.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <Calendar className="h-3 w-3" />
                      Next: {formatDate(sub.nextBillingDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right font-mono">
                  <div className="text-xs font-bold text-white">{formatCurrency(sub.amount)}</div>
                  <div className="text-[10px] text-slate-500 capitalize">{sub.billingCycle}</div>
                </div>

                <button
                  onClick={() => onToggleStatus(sub.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title={isActive ? "Pause Subscription" : "Activate Subscription"}
                >
                  {isActive ? (
                    <PauseCircle className="h-4 w-4 text-amber-400" />
                  ) : (
                    <PlayCircle className="h-4 w-4 text-emerald-400" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

