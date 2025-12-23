// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const navigate = useNavigate();
  return (
    <div className="p-5 rounded-md bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300 transition">
  <div className="flex items-center justify-between">
    <p className="text-xs text-gray-500">
      {daysAgoFunction(job?.createdAt) === 0
        ? "Today"
        : `${daysAgoFunction(job?.createdAt)} days ago`}
    </p>
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full text-gray-500 hover:text-[#6A38C2]"
    >
      <Bookmark />
    </Button>
  </div>

  <div className="flex items-center gap-3 my-3">
    <Avatar className="h-10 w-10">
      <AvatarImage src={job?.company?.logo} />
    </Avatar>
    <div>
      <h1 className="text-sm font-medium text-gray-700">
        {job?.company?.name}
      </h1>
      <p className="text-xs text-gray-500">India</p>
    </div>
  </div>

  <div>
    <h1 className="font-semibold text-base sm:text-lg my-2">
      {job?.title}
    </h1>
    <p className="text-sm text-gray-600 line-clamp-3">
      {job?.description}
    </p>
  </div>

  <div className="flex flex-wrap items-center gap-2 mt-4">
    <Badge className="text-blue-700 font-semibold" variant="ghost">
      {job?.position} Positions
    </Badge>
    <Badge className="text-[#F83002] font-semibold" variant="ghost">
      {job?.jobType}
    </Badge>
    <Badge className="text-[#7209b7] font-semibold" variant="ghost">
      {job?.salary}
    </Badge>
  </div>

  <div className="flex items-center gap-4 mt-4">
    <Button
      onClick={() => navigate(`/description/${job?._id}`)}
      variant="outline"
    >
      Details
    </Button>
    <Button variant="ghost">Save For Later</Button>
  </div>
</div>

  );
};

export default Job;
