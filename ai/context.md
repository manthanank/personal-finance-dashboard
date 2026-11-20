# FinTrack - Personal Finance Dashboard AI System Context

This document provides system context, data models, and architectural specifications for AI assistants working on FinTrack.

---

## 1. Project Overview
- **Project**: Personal Finance & Budget Dashboard (Project 02 of the 10-Project Full-Stack Suite)
- **Author**: Manthan Ank
- **Framework**: Next.js 15 (App Router, Server & Client Components)
- **Language**: Strict TypeScript
- **Database & Auth**: PostgreSQL via Supabase (Row Level Security enabled)
- **Data Visualizations**: Recharts (`ResponsiveContainer`, `AreaChart`, `PieChart`)
- **File Parsing**: PapaParse (CSV streaming parser for bank statements)
- **Styling**: Tailwind CSS (dark mode theme) with Framer Motion animations
- **Observability**: `@vercel/analytics` and `@vercel/speed-insights`

---

## 2. Core Modules & Files
- `supabase/schema.sql`: Full SQL schema with PostgreSQL tables (`profiles`, `transactions`, `budgets`, `subscriptions`) and RLS policies.
- `lib/types.ts`: TypeScript contracts for `Transaction`, `BudgetCategory`, `Subscription`, `CashFlowPoint`.
- `lib/mock-data.ts`: Preloaded sample transactions, budgets, subscriptions, and cash flow data for zero-config offline demonstration.
- `lib/ai-finance.ts`: Financial heuristics and AI analysis logic.
- `components/CsvImportModal.tsx`: Bank statement file parser with instant sample download and preview.
- `components/AiFinancialAdvisorModal.tsx`: Financial advisor widget analyzing real user data.

---

## 3. Security & Multi-Tenancy
- Supabase Row Level Security (RLS) policies enforce that users can only read, insert, update, and delete their own ledger entries.
- Offline mode transparently falls back to persistent local storage for developer evaluation.

