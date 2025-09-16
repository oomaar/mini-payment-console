"use client";
import { Payment } from "@/lib/db";
import { useState } from "react";
import { HomePageTable } from "./HomePageTable/HomePageTable";
import { HomePageFilters } from "./HomePageFilters/HomePageFilters";
import "./HomePageContainer.css";
import Link from "next/link";

type HomePageContainerProps = {
  allPayments: Payment[];
};

export type Filters = {
  searchTerm: string;
  status: "all" | "pending" | "paid" | "canceled";
};

export function HomePageContainer(props: HomePageContainerProps) {
  const { allPayments } = props;

  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    status: "all",
  });

  const filtered = allPayments.filter((payment) => {
    const merchantOrderId = payment.merchantOrderId.toLowerCase();

    const matchQ = filters.searchTerm
      ? merchantOrderId.includes(filters.searchTerm.toLowerCase())
      : true;

    const matchStatus =
      filters.status === "all" ? true : payment.status === filters.status;

    return matchQ && matchStatus;
  });

  const sorted = filtered.sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt)
  );

  return (
    <div className="home-page-container">
      <div className="home-page-header">
        <h1>Payments</h1>
        <Link href={`/new`}>New Payment</Link>
      </div>
      <HomePageFilters filters={filters} setFilters={setFilters} />
      {sorted.length === 0 ? (
        <div className="home-page-empty-container">
          <p>No payments found.</p>
        </div>
      ) : (
        <HomePageTable payments={sorted} />
      )}
    </div>
  );
}
