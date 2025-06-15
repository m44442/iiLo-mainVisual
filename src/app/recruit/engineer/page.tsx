"use client";

import React from "react";
import EngineerRecruitPage from "../../components/EngineerRecruitPage";
import Footer from "../../components/Footer";

const EngineerRecruitRoute = () => {
  return (
    <div style={{ backgroundColor: "#E7E7E7", minHeight: "100vh" }}>
      <div style={{ paddingTop: "110px" }}>
        <EngineerRecruitPage />
      </div>
      <Footer />
    </div>
  );
};

export default EngineerRecruitRoute;