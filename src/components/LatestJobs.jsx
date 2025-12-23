import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
        <span className="text-[#6A38C2]">Latest & Top</span>
        Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {!allJobs || allJobs.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
          No jobs available right now. Please check back later.
        </p>        
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards  key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
