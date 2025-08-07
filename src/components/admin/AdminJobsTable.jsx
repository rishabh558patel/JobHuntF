import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs = [], searchJobByText = "" } = useSelector(
    (store) => store.job
  );

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const text = searchJobByText.trim().toLowerCase();

    const result = allAdminJobs.filter((job) => {
      const titleMatch = job?.title?.toLowerCase().includes(text);
      const companyMatch = job?.company?.name?.toLowerCase().includes(text);
      return !text || titleMatch || companyMatch;
    });

    setFilteredJobs(result);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job?.company?.name || "N/A"}</TableCell>
              <TableCell>{job?.title || "Untitled"}</TableCell>
              <TableCell>
                {job?.createdAt ? job.createdAt.split("T")[0] : "—"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/jobs/${job?._id}/edit`)}
                      className="flex items-center gap-2 w-fit cursor-pointer hover:text-primary hover:scale-[1.05]"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => {
                        navigate(`/admin/jobs/${job._id}/applicants`);
                      }}
                      className="flex items-center gap-1 w-fit cursor-pointer mt-2 hover:scale-[1.05]"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
          {filteredJobs.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
