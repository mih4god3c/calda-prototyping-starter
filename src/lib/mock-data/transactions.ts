import type { Transaction } from "@/lib/types";

export const mockTransactions: Transaction[] = [
  {
    id: "txn-001",
    title: "Subscription renewed",
    amount: -29.99,
    currency: "USD",
    status: "completed",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Subscription",
    description: "Monthly Pro plan renewal",
  },
  {
    id: "txn-002",
    title: "Invoice #INV-089 paid",
    amount: 1200.0,
    currency: "USD",
    status: "completed",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Income",
    description: "Client project milestone payment",
  },
  {
    id: "txn-003",
    title: "Design assets purchase",
    amount: -49.0,
    currency: "USD",
    status: "completed",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Tools",
  },
  {
    id: "txn-004",
    title: "Cloud storage upgrade",
    amount: -9.99,
    currency: "USD",
    status: "pending",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Subscription",
  },
  {
    id: "txn-005",
    title: "Invoice #INV-088 paid",
    amount: 850.0,
    currency: "USD",
    status: "completed",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Income",
  },
  {
    id: "txn-006",
    title: "Freelance software tools",
    amount: -15.0,
    currency: "USD",
    status: "refunded",
    date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Tools",
    description: "Refunded — charged in error",
  },
];

export function formatAmount(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Math.abs(amount));
}
