import fs from "fs/promises";
import path from "path";

const DB_FILE = path.join(process.cwd(), "data", "payments.json");

export type PaymentStatus = "pending" | "paid" | "canceled";

export type Payment = {
  id: string;
  publicId: string;
  amount: number; // store in cents
  currency: "EGP";
  status: PaymentStatus;
  merchantOrderId: string;
  createdAt: string;
  updatedAt: string;
};

async function readAll(): Promise<Payment[]> {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(data) as Payment[];
  } catch {
    return [];
  }
}

async function writeAll(payments: Payment[]) {
  const tmp = DB_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(payments, null, 2), "utf-8");
  await fs.rename(tmp, DB_FILE);
}

export async function getPayments(): Promise<Payment[]> {
  return await readAll();
}

export async function getPaymentById(id: string): Promise<Payment | undefined> {
  return (await readAll()).find((p) => p.id === id);
}

export async function getPaymentByPublicId(
  publicId: string
): Promise<Payment | undefined> {
  return (await readAll()).find((p) => p.publicId === publicId);
}

export async function savePayment(payment: Payment) {
  const all = await readAll();
  all.unshift(payment);
  await writeAll(all);
}

export async function updatePayment(id: string, patch: Partial<Payment>) {
  const all = await readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Payment not found");
  all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  await writeAll(all);
  return all[idx];
}
