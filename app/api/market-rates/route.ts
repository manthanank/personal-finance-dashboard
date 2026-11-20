import { NextResponse } from "next/server";

export const revalidate = 30; // 30 seconds cache

export interface MarketRate {
  symbol: string;
  name: string;
  priceUsd: number;
  change24h?: number;
  type: "crypto" | "fiat";
}

const FALLBACK_RATES: MarketRate[] = [
  { symbol: "BTC", name: "Bitcoin", priceUsd: 64250.0, change24h: 2.4, type: "crypto" },
  { symbol: "ETH", name: "Ethereum", priceUsd: 2680.0, change24h: 1.8, type: "crypto" },
  { symbol: "SOL", name: "Solana", priceUsd: 154.2, change24h: 4.1, type: "crypto" },
  { symbol: "EUR", name: "Euro / USD", priceUsd: 1.085, change24h: 0.15, type: "fiat" },
  { symbol: "GBP", name: "British Pound / USD", priceUsd: 1.295, change24h: -0.2, type: "fiat" },
];

export async function GET() {
  try {
    const symbols = '["BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT"]';
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbols=${encodeURIComponent(symbols)}`,
      {
        next: { revalidate: 30 },
        headers: { "User-Agent": "FinTrack-Dashboard/1.0" },
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const nameMap: Record<string, string> = {
          BTCUSDT: "Bitcoin",
          ETHUSDT: "Ethereum",
          SOLUSDT: "Solana",
          BNBUSDT: "BNB",
        };

        const rates: MarketRate[] = data.map((item: any) => ({
          symbol: item.symbol.replace("USDT", ""),
          name: nameMap[item.symbol] || item.symbol,
          priceUsd: parseFloat(item.price),
          type: "crypto",
        }));

        // Add fiat cross rates
        rates.push(
          { symbol: "EUR/USD", name: "Euro", priceUsd: 1.085, type: "fiat" },
          { symbol: "GBP/USD", name: "British Pound", priceUsd: 1.295, type: "fiat" }
        );

        return NextResponse.json({
          success: true,
          dataSource: "Binance Live Crypto Ticker API",
          timestamp: new Date().toISOString(),
          rates,
        });
      }
    }

    return NextResponse.json({
      success: true,
      dataSource: "Snapshot Benchmark",
      timestamp: new Date().toISOString(),
      rates: FALLBACK_RATES,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      dataSource: "Snapshot Benchmark (Offline Fallback)",
      timestamp: new Date().toISOString(),
      rates: FALLBACK_RATES,
    });
  }
}

