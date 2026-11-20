import { describe, it, expect } from "vitest";
import { GET as getRates } from "../app/api/market-rates/route";
import { GET as getTransactions } from "../app/api/transactions/route";

describe("Personal Finance Dashboard API Routes", () => {
  it("GET /api/market-rates returns crypto and forex rates", async () => {
    const req = new Request("http://localhost:3000/api/market-rates");
    const res = await getRates(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.rates)).toBe(true);
    expect(data.rates.length).toBeGreaterThan(0);
  });

  it("GET /api/transactions returns user transaction history", async () => {
    const req = new Request("http://localhost:3000/api/transactions");
    const res = await getTransactions(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.transactions)).toBe(true);
  });
});
