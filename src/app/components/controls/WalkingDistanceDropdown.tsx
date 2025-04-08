"use client";

import { useState } from "react";
import { Select, DropdownOption } from "../ui/dropdown";

const walkingDistanceOptions: DropdownOption[] = [
  { label: "Less than 2 minute walk", value: "2" },
  { label: "Less than 5 minute walk", value: "5" },
  { label: "Less than 10 minute walk", value: "10" },
];

interface WalkingDistanceDropdownProps {
  onChange?: (value: string) => void;
  className?: string;
}

export function WalkingDistanceDropdown({ onChange, className = "" }: WalkingDistanceDropdownProps) {
  const [selectedDistance, setSelectedDistance] = useState(walkingDistanceOptions[2].value);

  const handleChange = (value: string) => {
    setSelectedDistance(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      label="Walking Distance"
      options={walkingDistanceOptions}
      value={selectedDistance}
      onChange={handleChange}
      className={className}
    />
  );
}
