import { NextResponse } from "next/server";
import { Transaction } from "@/lib/types";

function generateDynamicRelativeTransactions(): Transaction[] {
  const now = new Date();
  const relDate = (daysAgo: number) => {
    const d = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return d.toISOString().split("T")[0];
  };

  return [
    {
      id: "tx-1",
      date: relDate(0), // Today
      description: "SaaS Enterprise Retainer",
      amount: 4850.0,
      type: "income",
      category: "Salary / Freelance",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "tx-2",
      date: relDate(1), // Yesterday
      description: "Whole Foods Market Grocery",
      amount: 142.5,
      type: "expense",
      category: "Food & Dining",
      paymentMethod: "Apple Pay",
    },
    {
      id: "tx-3",
      date: relDate(2),
      description: "AWS Cloud Infrastructure - Production Cluster",
      amount: 124.8,
      type: "expense",
      category: "Utilities & Tech",
      paymentMethod: "Corporate Card",
    },
    {
      id: "tx-4",
      date: relDate(4),
      description: "Downtown Apartment Rent & Maintenance",
      amount: 1950.0,
      type: "expense",
      category: "Housing",
      paymentMethod: "ACH Direct Debit",
    },
    {
      id: "tx-5",
      date: relDate(5),
      description: "Stripe Developer Platform Payout",
      amount: 1250.0,
      type: "income",
      category: "Investments & Side",
      paymentMethod: "Stripe",
    },
    {
      id: "tx-6",
      date: relDate(7),
      description: "Equinox Fitness Club Membership",
      amount: 120.0,
      type: "expense",
      category: "Health & Fitness",
      paymentMethod: "Debit Card",
    },
    {
      id: "tx-7",
      date: relDate(9),
      description: "GitHub Copilot Enterprise & Vercel Pro",
      amount: 45.0,
      type: "expense",
      category: "Utilities & Tech",
      paymentMethod: "Credit Card",
    },
    {
      id: "tx-8",
      date: relDate(12),
      description: "Artisan Coffee Roasters & Bakery",
      amount: 32.4,
      type: "expense",
      category: "Food & Dining",
      paymentMethod: "Apple Pay",
    },
  ];
}

let serverTransactions: Transaction[] = generateDynamicRelativeTransactions();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const category = searchParams.get("category");

  let filtered = [...serverTransactions];

  if (type) {
    filtered = filtered.filter((t) => t.type === type);
  }

  if (category && category !== "All") {
    filtered = filtered.filter((t) => t.category === category);
  }

  const totalInflow = filtered
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutflow = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return NextResponse.json({
    success: true,
    count: filtered.length,
    netBalance: totalInflow - totalOutflow,
    totalInflow,
    totalOutflow,
    transactions: filtered,
    generatedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.description || !body.amount || !body.category) {
      return NextResponse.json(
        { error: "Description, amount, and category are required" },
        { status: 400 }
      );
    }

    const newTx: Transaction = {
      id: body.id || `tx-${Date.now()}`,
      date: body.date || new Date().toISOString().split("T")[0],
      description: body.description,
      amount: parseFloat(body.amount),
      type: body.type || "expense",
      category: body.category,
      paymentMethod: body.paymentMethod || "Credit Card",
    };

    serverTransactions = [newTx, ...serverTransactions];

    return NextResponse.json({
      success: true,
      message: "Transaction recorded",
      transaction: newTx,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing transaction id" }, { status: 400 });
  }

  serverTransactions = serverTransactions.filter((t) => t.id !== id);

  return NextResponse.json({
    success: true,
    message: "Transaction deleted",
    remainingCount: serverTransactions.length,
  });
}

