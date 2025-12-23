import { Contact, Mail, Pen } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppliedJobTable from "./AppliedJobTable";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import UploadMandatoryNote from "./shared/UploadMandatoryNote";

const isResume = true;
const Profile = () => {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);
  // const skills = user.profile.skills;
  return (
    <div>
      <Navbar />
      <UploadMandatoryNote />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage alt="profile" src={user?.profile?.profilePhoto} />
            </Avatar>
            <div className="">
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-sm text-gray-600 mt-1">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setOpen(true)}>
            <Pen className="sm:mr-2" />
            <span className="sm:inline">Edit Profile</span>
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="h-4 w-4 text-gray-500" />

            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="h-4 w-4 text-gray-500" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h1>Skills</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills.length == 0 ? (
              <span>NA</span>
            ) : (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            )}
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl mt-6 p-6">

        <h1 className="font-bold text-lg">Applied Jobs</h1>
        {/* Application Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
