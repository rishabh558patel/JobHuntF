import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import store from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  // Filter jobs based on search query (case-insensitive)
  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(searchedQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <h1 className="font-bold text-2xl sm:text-3xl mb-6">
          Search Results ({filteredJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full mt-20">
              No jobs match your search.
            </p>
          ) : (
            filteredJobs.map((job) => {
              return <Job key={job._id} job={job} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
