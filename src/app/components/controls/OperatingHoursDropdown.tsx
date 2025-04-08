"use client";

import { useState } from "react";
import { Select, DropdownOption } from "../ui/dropdown";

const operatingHoursOptions: DropdownOption[] = [
  { label: "Open now", value: "now" },
  { label: "Open for the next 2 hours", value: "2hours" },
  { label: "Open for the next 4 hours", value: "4hours" },
];

interface OperatingHoursDropdownProps {
  onChange?: (value: string) => void;
  className?: string;
}

export function OperatingHoursDropdown({ onChange, className = "" }: OperatingHoursDropdownProps) {
  const [selectedHours, setSelectedHours] = useState(operatingHoursOptions[0].value);

  const handleChange = (value: string) => {
    setSelectedHours(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      label="Operating Hours"
      options={operatingHoursOptions}
      value={selectedHours}
      onChange={handleChange}
      className={className}
    />
  );
}
