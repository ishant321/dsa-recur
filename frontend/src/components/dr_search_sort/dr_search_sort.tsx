import DrTextInput from "../dr_text_input";
import "./index.scss";
import DrButton from "../dr_button";
import DrPopover from "../dr_popover";
import DrText from "../dr_text";

export interface SortOption {
  label: string;
  value: string;
}

interface Props {
  value?: string;
  sortValue?: string;
  sortOptions: SortOption[];
  placeholder?: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function DrSearchSort({
  value = "",
  sortValue,
  sortOptions,
  placeholder = "Search...",
  onSearchChange,
  onSortChange,
}: Props) {
  return (
    <div className="dr-search-sort">
      <div className="dr-search-sort__input">
        <DrTextInput
          value={value}
          onChange={onSearchChange}
          placeholder={placeholder}
        />
      </div>

      <DrPopover
        placement="bottom-end"
        target={
          <DrButton
            ariaLabel="Sort options"
            size="s"
            leadingIcon="sort"
            variant="justText"
          />
        }
        content={
          <div className="dr-search-sort__menu">
            {sortOptions.map((option) => (
              <DrText
                key={option.value}
                className={
                  sortValue === option.value
                    ? "dr-search-sort__option--selected"
                    : ""
                }
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onSortChange(option.value);
                }}
              >
                {option.label}
              </DrText>
            ))}
          </div>
        }
      />
    </div>
  );
}
