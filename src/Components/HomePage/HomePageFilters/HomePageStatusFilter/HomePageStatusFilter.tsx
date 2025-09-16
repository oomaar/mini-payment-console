"use client";
import { useEffect, useRef, useState } from "react";
import { Filters } from "../../HomePageContainer";
import "./HomePageStatusFilter.css";

type HomePageStatusFilterProps = {
  status: "all" | "pending" | "paid" | "canceled";
  onStatusSelect: (status: Filters["status"]) => void;
};

type statusFilterOption = {
  label: string;
  value: "all" | "pending" | "paid" | "canceled";
};

const statusFilterOptions: statusFilterOption[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Canceled", value: "canceled" },
];

export function HomePageStatusFilter(props: HomePageStatusFilterProps) {
  const { status, onStatusSelect } = props;

  const [showStatusFilter, setShowStatusFilter] = useState(false);

  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onElseWhereClick = (e: MouseEvent) => {
      if (dropdownContainerRef.current?.contains(e.target as Node) === false) {
        setShowStatusFilter(false);
      }
    };

    document.body.addEventListener("click", onElseWhereClick);

    return () => document.body.removeEventListener("click", onElseWhereClick);
  }, [showStatusFilter]);

  return (
    <div className="status-filter-container" ref={dropdownContainerRef}>
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
        {statusFilterOptions.map((option) => (
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
