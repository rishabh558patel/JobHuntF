import store from "@/redux/store";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    console.log("✅ Applicants from Redux:", applicants);
  }, [applicants]);

  const handleShortlistAction = async (applicationId, status) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
        { status },
        { withCredentials: true }
      );
      if(res.data.success){
        toast.success(res.data.message);
      }
      console.log(
        `🎯 Application ${applicationId} marked as ${status}`,
        res.data
      );
      // optionally reload the applicants list from backend
    } catch (err) {
      toast.error(err.response.data.message);
      console.error("❌ Error updating application status:", err);
      console.log(err);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.map((application, index) => (
            <TableRow key={index}>
              <TableCell>{application?.applicant?.fullname || "N/A"}</TableCell>
              <TableCell>{application?.applicant?.email || "N/A"}</TableCell>
              <TableCell>
                {application?.applicant?.phoneNumber || "N/A"}
              </TableCell>
              <TableCell>
                {application?.applicant?.profile?.resume ? (
                  <a
                    href={application?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="text-gray-400 italic">No Resume</span>
                )}
              </TableCell>
              <TableCell>
                {application?.createdAt
                  ? new Date(application.createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <button
                      className="block w-full px-2 py-1 text-green-600 hover:bg-green-100"
                      onClick={() =>
                        handleShortlistAction(application?._id, "Accepted")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="block w-full px-2 py-1 text-red-600 hover:bg-red-100"
                      onClick={() =>
                        handleShortlistAction(application?._id, "Rejected")
                      }
                    >
                      Reject
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
