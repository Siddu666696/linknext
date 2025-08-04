"use client";
import React from "react";
import { useSelector } from "react-redux";

const Home = () => {

  const profileDetails= useSelector((state)=>state)


  return (
    <>
      Jobseeker Home
    </>
  );
};

export default Home;
