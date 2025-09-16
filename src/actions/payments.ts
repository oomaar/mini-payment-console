"use server"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { genSystemId, genPublicId } from "@/lib/id";
import {
  getPaymentByPublicId,
  savePayment,
  updatePayment,
  type Payment,
} from "@/lib/db";

export async function createPayment(formData: FormData) {
  const amount = Number(formData.get("amount"));
  const merchantOrderId = String(formData.get("merchantOrderId") || "");

  const payment: Payment = {
    id: genSystemId(),
    publicId: genPublicId(),
    amount,
    currency: "EGP",
    status: "pending",
    merchantOrderId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await savePayment(payment);
  revalidatePath("/");
  redirect(`/payments/${payment.id}`);
}

export async function markPaid(publicId: string) {
  const payment = await getPaymentByPublicId(publicId);
  if (!payment) throw new Error("Not found");
  await updatePayment(payment.id, { status: "paid" });
  revalidatePath("/");
  revalidatePath(`/payments/${payment.id}`);
}

export async function markCanceled(publicId: string) {
  const payment = await getPaymentByPublicId(publicId);
  if (!payment) throw new Error("Not found");
  await updatePayment(payment.id, { status: "canceled" });
  revalidatePath("/");
  revalidatePath(`/payments/${payment.id}`);
}
