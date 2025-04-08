"use client";

import { useState } from "react";
import { Select, DropdownOption } from "../ui/dropdown";

const destinationTypeOptions: DropdownOption[] = [
  { label: "Food & drink", value: "food_drink" },
  { label: "Apparel, shoes, accessories, and bags", value: "fashion" },
  { label: "Grocery", value: "grocery" },
  { label: "Beer, wine, and spirits", value: "alcohol" },
  { label: "Housewares and hardware", value: "housewares" },
  { label: "Florists and gifts", value: "gifts" },
  { label: "Theaters, cinema, and event venues", value: "entertainment" },
  { label: "Dry cleaning and laundry", value: "laundry" },
  { label: "Tourist attractions and scenic attractions", value: "attractions" },
];

interface DestinationTypeDropdownProps {
  onChange?: (value: string) => void;
  className?: string;
}

export function DestinationTypeDropdown({ onChange, className = "" }: DestinationTypeDropdownProps) {
  const [selectedType, setSelectedType] = useState(destinationTypeOptions[0].value);

  const handleChange = (value: string) => {
    setSelectedType(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      label="Destination Type"
      options={destinationTypeOptions}
      value={selectedType}
      onChange={handleChange}
      className={className}
    />
  );
}
