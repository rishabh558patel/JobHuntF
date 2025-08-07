import store from "@/redux/store";
import { JOB_API_END_POINT } from "@/utils/constant";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const PostJob = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const jobTypeSelect = [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Contract",
    "Remote",
  ];

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true, // this is critical if you're using cookies/session
        });
        if (res.data.success) {
          const job = res.data.job;
          setInput({
            title: job.title,
            description: job.description,
            requirements: job.requirements,
            salary: job.salary,
            location: job.location,
            jobType: job.jobType,
            experience: job.experience,
            position: job.position,
            companyId: job.company._id, // assuming job has a populated company object
          });
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        toast.error("Failed to load job data");
      }
    };

    if (isEdit) {
      fetchJob();
    }
  }, [id]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectJobHandler = (value) => {
    const selectedJob = jobTypeSelect.find((job) => job.toLowerCase() == value);
    setInput({ ...input, jobType: selectedJob });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() == value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const sanitizedInput = {
        ...input,
        salary: Number(String(input.salary).replace(/[^\d]/g, "")),
        experience: Number(String(input.experience).replace(/[^\d]/g, "")),
      };

      const res = isEdit
        ? await axios.put(`${JOB_API_END_POINT}/update/${id}`, sanitizedInput, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
        : await axios.post(`${JOB_API_END_POINT}/post`, sanitizedInput, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });

      if (isNaN(sanitizedInput.salary) || isNaN(sanitizedInput.experience)) {
        return toast.error("Salary and Experience must be numbers.");
      }

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Select onValueChange={selectJobHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={input.jobType || "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {jobTypeSelect.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies?.map((company) => {
                    return (
                      companies?.length > 0 && (
                        <SelectItem
                          key={company?._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company?.name}
                        </SelectItem>
                      )
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              {isEdit ? "Update Job" : "Post New Job"}
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
