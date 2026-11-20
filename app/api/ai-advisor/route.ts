import { NextResponse } from "next/server";
import { getFinancialAIAnalysis } from "@/lib/ai-finance";
import { Transaction, BudgetCategory, Subscription } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const { query, transactions, budgets, subscriptions } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const reply = getFinancialAIAnalysis(
      query,
      transactions || [],
      budgets || [],
      subscriptions || []
    );

    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate financial analysis" },
      { status: 500 }
    );
  }
}

