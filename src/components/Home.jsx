import React from "react";
import CategoryCarousal from "./CategoryCarousal";
import Footer from "./shared/Footer";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Navbar from "./shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate("/admin/companies");
    }
  }, []);
  useGetAllJobs();
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousal />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
