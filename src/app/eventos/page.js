"use client";
import Nav from "convention/components/navComponents/Nav";
import Content from "convention/components/pageComponents/Content";
import Topper from "convention/components/pageComponents/Topper";
import { useState } from "react";

export default function SchoolEventsPage() {
  const [pageSchoolData, setPageSchoolData] = useState({});

  return (
    <div id="page">
      <Topper />
      <div id="split">
        <Nav pageSchoolData={pageSchoolData} pathname="/schoolEvents" />
        <Content
          setPageSchoolData={setPageSchoolData}
          pathname="/schoolEvents"
        />
      </div>
    </div>
  );
}
