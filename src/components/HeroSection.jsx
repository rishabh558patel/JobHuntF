import { setSearchedQuery } from "@/redux/jobSlice";
import { Search } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate(`/browse`);
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Job Hunt Website.
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Search, Apply & <br /> Get Your
          <span className="text-[#6A38C2]"> Dream Jobs</span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          minus veritatis aut tenetur dolore?
        </p>

        <div className="flex w-full sm:w-[70%] lg:w-[40%] h-12 shadow-lg border border-gray-200 pl-4 rounded-full items-center gap-3 mx-auto">
          <input
            type="text"
            placeholder="Search jobs by role, company, or location"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none w-full focus:ring-2 focus:ring-[#6A38C2] rounded-l-full"
          />
          <Button
            onClick={searchJobHandler}
            className="h-full rounded-r-full bg-[#6A38C2]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
