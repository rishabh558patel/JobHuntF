import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const AppliedJobTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setApplications(res.data.application);
      } else {
        toast.error("Failed to fetch applied jobs.");
      }
    } catch (err) {
      console.error("❌ Error fetching applied jobs:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app, index) => (
            <TableRow key={index}>
              <TableCell>
                {new Date(app.createdAt).toLocaleDateString("en-IN")}
              </TableCell>
              <TableCell>{app.job?.title || "N/A"}</TableCell>
              <TableCell>{app.job?.company?.name || "N/A"}</TableCell>
              <TableCell className="text-right">
                <Badge variant={
                  app.status === "accepted"
                    ? "success"
                    : app.status === "rejected"
                    ? "destructive"
                    : "secondary"
                }>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
