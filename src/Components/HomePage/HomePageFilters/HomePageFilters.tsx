import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Filters } from "../HomePageContainer";
import { HomePageSearchFilter } from "./HomePageSearchFilter/HomePageSearchFilter";
import { HomePageStatusFilter } from "./HomePageStatusFilter/HomePageStatusFilter";
import "./HomePageFilters.css";

type HomePageFiltersProps = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export function HomePageFilters(props: HomePageFiltersProps) {
  const { filters, setFilters } = props;

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((f) => ({ ...f, searchTerm: e.target.value }));
  };

  const onStatusSelect = (status: Filters["status"]) => {
    setFilters((f) => ({ ...f, status }));
  };

  return (
    <div className="home-page-filters-container">
      <HomePageSearchFilter
        searchTerm={filters.searchTerm}
        onSearch={onSearch}
      />
      <HomePageStatusFilter
        status={filters.status}
        onStatusSelect={onStatusSelect}
      />
    </div>
  );
}
