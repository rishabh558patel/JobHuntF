import { setSearchedQuery } from "@/redux/jobSlice";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        {selectedValue && (
          <button
            onClick={() => setSelectedValue("")}
            className="text-sm text-[#6A38C2] hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div className="mt-4" key={index}>
            <h1 className="font-bold text-lg mb-2">{data.filterType}</h1>
            {data.array.map((item, subIndex) => {
              const itemId = `id${index}-${subIndex}`;
              return (
                <div
                  key={subIndex}
                  className={`flex items-center gap-3 py-2 px-2 rounded-md ${
                    selectedValue === item ? "bg-gray-100" : ""
                  }`}
                >
                  <RadioGroupItem
                    value={item}
                    className="cursor-pointer"
                    id={itemId}
                  />
                  <Label htmlFor={itemId} className="cursor-pointer text-sm">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
