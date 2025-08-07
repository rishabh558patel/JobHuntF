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
  console.log("searchedQuery from Redux:", searchedQuery);
  console.log("All jobs:", allJobs);
  console.log("Filtered jobs:", filteredJobs);
  
  // useEffect(() => {
  //   return () => {
  //     dispatch(setSearchedQuery(""));
  //   };
  // }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
