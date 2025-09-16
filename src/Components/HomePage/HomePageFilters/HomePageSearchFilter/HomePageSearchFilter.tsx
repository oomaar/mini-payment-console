import { ChangeEvent } from "react";
import "./HomePageSearchFilter.css";

type HomePageSearchFilterProps = {
  searchTerm: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function HomePageSearchFilter(props: HomePageSearchFilterProps) {
  const { searchTerm, onSearch } = props;

  return (
    <div className="search-input-container">
      <input
        className="search-input"
        type="search"
        placeholder="Search by merchantOrderId"
        value={searchTerm}
        onChange={(e) => onSearch(e)}
      />
    </div>
  );
}
