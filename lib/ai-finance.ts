import { Transaction, BudgetCategory, Subscription } from "./types";
import { formatCurrency } from "./utils";

export function getFinancialAIAnalysis(
  query: string,
  transactions: Transaction[],
  budgets: BudgetCategory[],
  subscriptions: Subscription[]
): string {
  const q = query.toLowerCase();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : "0";

  // Category breakdown
  const categoryExpenses: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryExpenses[t.category] = (categoryExpenses[t.category] || 0) + t.amount;
    });

  const sortedCategories = Object.entries(categoryExpenses).sort((a, b) => b[1] - a[1]);
  const highestCategory = sortedCategories[0] || ["None", 0];

  // Over budget check
  const overBudgetCategories = budgets.filter((b) => b.spent > b.allocated);
  const nearBudgetCategories = budgets.filter(
    (b) => b.spent >= b.allocated * 0.85 && b.spent <= b.allocated
  );

  if (q.includes("highest") || q.includes("most") || q.includes("where is my money")) {
    return (
      `📊 **Top Spending Category**: Your largest expense is **${highestCategory[0]}** at **${formatCurrency(
        highestCategory[1]
      )}** (${(((highestCategory[1] as number) / (totalExpense || 1)) * 100).toFixed(1)}% of total expenses).\n\n` +
      `💡 *Recommendation*: Look for discretionary recurring items in ${highestCategory[0]} that can be reduced to accelerate your emergency fund.`
    );
  }

  if (q.includes("budget") || q.includes("exceed") || q.includes("limit")) {
    if (overBudgetCategories.length > 0) {
      const list = overBudgetCategories
        .map((b) => `- **${b.name}**: spent ${formatCurrency(b.spent)} of ${formatCurrency(b.allocated)}`)
        .join("\n");
      return `⚠️ **Budget Overruns Detected**:\n${list}\n\nImmediate action recommended to avoid running a deficit this billing cycle.`;
    }
    if (nearBudgetCategories.length > 0) {
      const list = nearBudgetCategories
        .map((b) => `- **${b.name}**: ${formatCurrency(b.spent)} of ${formatCurrency(b.allocated)} (over 85%)`)
        .join("\n");
      return `🟡 **Approaching Budget Limits**:\n${list}\n\nYou are close to your threshold. Hold discretionary purchases in these areas for the rest of the month.`;
    }
    return `✅ **All Budgets Healthy**: You are within your allocated spending targets across all ${budgets.length} budget categories! Great financial discipline.`;
  }

  if (q.includes("subscription") || q.includes("recurring") || q.includes("bills")) {
    const activeSubs = subscriptions.filter((s) => s.status === "active");
    const monthlyTotal = activeSubs.reduce((sum, s) => sum + s.amount, 0);
    const subList = activeSubs
      .map((s) => `- **${s.name}**: ${formatCurrency(s.amount)}/mo (Next: ${s.nextBillingDate})`)
      .join("\n");
    return (
      `💳 **Active Subscriptions Summary** (${activeSubs.length} services):\n${subList}\n\n` +
      `**Total Monthly Commitment**: **${formatCurrency(monthlyTotal)}** (~${formatCurrency(monthlyTotal * 12)}/year).`
    );
  }

  if (q.includes("savings") || q.includes("rate") || q.includes("net worth") || q.includes("income")) {
    return (
      `📈 **Financial Health Snapshot**:\n` +
      `- **Total Income**: ${formatCurrency(totalIncome)}\n` +
      `- **Total Outflow**: ${formatCurrency(totalExpense)}\n` +
      `- **Net Surplus**: ${formatCurrency(netSavings)}\n` +
      `- **Savings Rate**: **${savingsRate}%**\n\n` +
      `🎯 *Benchmark*: Standard financial guidance recommends aiming for a 20%+ savings rate. At **${savingsRate}%**, your cash flow trajectory is ${
        Number(savingsRate) >= 20 ? "exceptional!" : "moderate. Review discretionary categories to increase surplus."
      }`
    );
  }

  return (
    `🤖 **FinAI Analysis Summary**:\n` +
    `Your current ledger contains ${transactions.length} transactions across ${Object.keys(categoryExpenses).length} categories.\n` +
    `Total Income: ${formatCurrency(totalIncome)} | Total Expenses: ${formatCurrency(totalExpense)} | Net Savings: ${formatCurrency(netSavings)} (${savingsRate}%).\n\n` +
    `Try asking: "Where am I spending the most?", "Am I over budget?", or "Summarize my subscriptions".`
  );
}

