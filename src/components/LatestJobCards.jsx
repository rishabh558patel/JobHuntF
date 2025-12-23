import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-5 rounded-md shadow-sm hover:shadow-md transition
      bg-white border border-gray-100 cursor-pointer"
      onClick={() => navigate(`/description/${job?._id}`)}
    >
      <div>
        <h1 className="text-sm font-medium text-gray-700">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">{job?.location || "India"}</p>
      </div>
      <div>
        <h1 className="font-semibold text-base sm:text-lg my-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4 hover:border-gray-300 hover:scale-[1.01] transition">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          ₹{Number(job?.salary).toLocaleString("en-IN")}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
