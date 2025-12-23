import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import { useState } from "react";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  const user = useSelector((store) => store.auth.user);
  const { singleJob } = useSelector((store) => store.job);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job?.applications?.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return (
      <p className="text-center text-gray-500 my-20">Loading job details...</p>
    );
  }

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      console.log(res.data);

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); //helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("❌ API Apply Error:", error);
      // toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge className="text-blue-700 font-bold" variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="ghost">
                {singleJob?.salary}LPA
              </Badge>
            </div>
          </div>

          <Button
            onClick={() => {
              if (!user?._id) {
                toast.error("Please log in to apply.");
                return;
              }
              if (!isApplied) applyJobHandler();
            }}
            disabled={!user?._id || isApplied}
            className={`rounded-lg ${
              !user?._id || isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {!user?._id
              ? "Login to Apply"
              : isApplied
              ? "Already Applied"
              : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          {singleJob?.description}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 my-6">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.experienceLevel} yrs
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.salary}LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
