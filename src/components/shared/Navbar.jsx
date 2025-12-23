import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import axios from "axios";
import { LogOut, Menu, User2, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="bg-white shadow-sm relative z-40">
      {/* FULL WIDTH BAR */}
      <div className="flex items-center justify-between h-16 px-4 md:px-0 md:max-w-7xl md:mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <AvatarFallback>{user?.fullname?.[0]}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent
                side="bottom"
                align="end"
                sideOffset={8}
                className="w-72 p-4 z-50"
              >
                <div className="flex gap-4 mb-3">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      className="w-10 h-10 rounded-full"
                    />
                    <AvatarFallback>{user?.fullname?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-3 space-y-2">
                  {user.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-sm"
                    >
                      <User2 size={18} /> View Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-sm text-red-500"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4">
          <ul className="space-y-3 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md hover:bg-gray-100">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md hover:bg-gray-100">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md hover:bg-gray-100">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md hover:bg-gray-100">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md hover:bg-gray-100">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {user ? (
            <div className="flex flex-col gap-3">
              {user.role === "student" && (
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <User2 size={18} />
                  View Profile
                </Link>
              )}

              <button
                onClick={() => {
                  setOpen(false);
                  logoutHandler();
                }}
                className="flex items-center gap-2 text-sm font-medium text-red-500"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-[#6A38C2]">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
