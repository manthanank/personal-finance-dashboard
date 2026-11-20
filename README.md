# FinTrack — Personal Finance & Budget Dashboard

> High-performance personal wealth and budgeting dashboard with Supabase Row Level Security (RLS), Recharts analytics, drag-and-drop CSV statement parsing, and automated financial AI guidance.

Part of the **10-Project Full-Stack Suite** by [Manthan Ank](https://github.com/manthanank).

---

## 🚀 Key Features & Capabilities

- **Interactive Transaction Ledger**: Record, search, filter (by type and category), and paginate income and expense transactions. Responsive desktop table and mobile card list.
- **CSV Bank Statement Importer**: Drag-and-drop file dropzone powered by PapaParse with automated categorization and sample CSV generator.
- **Dynamic Recharts Analytics**:
  - Cash Flow Velocity Area Chart (Income vs. Expense over time)
  - Donut Chart for Expense Category Breakdown
  - 100% responsive across mobile, tablet, and desktop screens
- **Budget Manager & Alert Thresholds**: Visual progress meters per spending category with automatic color changes (>85% amber warning, >100% red overrun).
- **Subscription Tracker**: Monitor monthly recurring commitments (Netflix, AWS, gym, utilities) and toggle active/paused status.
- **FinAI Financial Advisor**: Context-aware AI assistant that analyzes your ledger, flags budget overruns, and calculates your savings rate.
- **Supabase Integration & RLS**: Complete PostgreSQL schema with Row Level Security policies ensuring strict multi-tenant user isolation.
- **Zero-Config Offline Mode**: Seamless local storage fallback allowing instant evaluation without requiring external credentials.
- **Observability**: Built-in `@vercel/analytics` and `@vercel/speed-insights`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, PostCSS, Lucide Icons, Framer Motion
- **Charts**: Recharts (`ResponsiveContainer`, `AreaChart`, `PieChart`)
- **CSV Engine**: PapaParse
- **Database**: PostgreSQL (Supabase with RLS)
- **Deployment**: Vercel

---

## 📦 Getting Started

1. Navigate to the project directory:
   ```bash
   cd c:\Users\manth\projects\personal-finance-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Supabase in `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

