import React from "react";
import { Dropdown, DropdownItem, Checkbox } from "flowbite-react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
}

export const MultiSelect = ({ options, value, onChange }: MultiSelectProps) => {
  const handleCheckboxChange = (checkedValue: string) => {
    if (value.includes(checkedValue)) {
      onChange(value.filter((item) => item !== checkedValue));
    } else {
      onChange([...value, checkedValue]);
    }
  };

  return (
    <Dropdown label="Some select" dismissOnClick={false}>
      {options.map((option) => (
        <DropdownItem
          key={option.value}
          onClick={() => handleCheckboxChange(option.value)}
        >
          <Checkbox
            checked={value.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
          />
          <label className="ml-2">{option.label}</label>
        </DropdownItem>
      ))}
    </Dropdown>
  );
};
