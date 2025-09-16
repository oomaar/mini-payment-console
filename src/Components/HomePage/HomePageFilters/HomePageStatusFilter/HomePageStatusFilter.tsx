"use client";
import { useState } from "react";
import { Filters } from "../../HomePageContainer";
import "./HomePageStatusFilter.css";

type HomePageStatusFilterProps = {
  status: "all" | "pending" | "paid" | "canceled";
  onStatusSelect: (status: Filters["status"]) => void;
};

export function HomePageStatusFilter(props: HomePageStatusFilterProps) {
  const { status, onStatusSelect } = props;

  const [showStatusFilter, setShowStatusFilter] = useState(false);

  const options: {
    label: string;
    value: "all" | "pending" | "paid" | "canceled";
  }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Paid", value: "paid" },
    { label: "Canceled", value: "canceled" },
  ];

  return (
    <div className="status-filter-container">
      <button
        onClick={() => setShowStatusFilter(!showStatusFilter)}
        className="status-filter-button"
        type="button"
      >
        {status}
        <span
          className={`status-filter-button-arrow ${
            showStatusFilter ? "rotate-status-filter-button-arrow" : ""
          }`}
        >{`>`}</span>
      </button>
      <ul className={`status-filter-list ${showStatusFilter ? "show" : ""}`}>
        {options.map((option) => (
          <li
            key={option.label}
            className={` ${status === option.value ? "active" : ""}`}
            onClick={() => {
              onStatusSelect(option.value);
              setShowStatusFilter(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
