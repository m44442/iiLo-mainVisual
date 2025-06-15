"use client";

import React from "react";
import StaffRecruitPage from "../../components/StaffRecruitPage";
import Footer from "../../components/Footer";

const StaffRecruitRoute = () => {
  return (
    <div style={{ backgroundColor: "#E7E7E7", minHeight: "100vh" }}>
      <div style={{ paddingTop: "110px" }}>
        <StaffRecruitPage />
      </div>
      <Footer />
    </div>
  );
};

export default StaffRecruitRoute;