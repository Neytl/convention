"use client";
import "convention/app/css/print.css";
import { useState, useEffect } from "react";
import SchoolPrintTable from "./SchoolPrintTable";

export default function PrintPage() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    console.log("loading...");
    let pathName = window.location.pathname;

    if (window.location.pathname == "/printSchools") {
      fetch("https://localhost:44398/api/MiniConvention/schoolsTables")
        .then((response) => response.json())
        .then((data) => {
          let pageData = {
            pathName: pathName,
            tables: data,
          };

          console.log(pageData);
          setPageData(pageData);
        });
    } else if (window.location.pathname == "/printSchool") {
      let queryStringSchoolID = new URLSearchParams(window.location.search).get(
        "school"
      );

      fetch(
        "https://localhost:44398/api/MiniConvention/schoolTable/" +
          queryStringSchoolID
      )
        .then((response) => response.json())
        .then((data) => {
          let pageData = {
            pathName: pathName,
            table: data,
          };

          console.log(pageData);
          setPageData(pageData);
        });
    }
  }, []);

  if (!pageData) return <div>{"..."}</div>;

  // Show the corresponding tables to print
  if (pageData.pathName == "/printSchools") {
    let tables = [];
    pageData.tables.forEach((tableData) => {
      tables.push(
        <SchoolPrintTable tableData={tableData} key={tableData.tableSchoolID} />
      );
    });

    return <div id="pageContainer">{tables}</div>;
  } else if (pageData.pathName == "/printSchool") {
    return (
      <div id="pageContainer">
        <SchoolPrintTable tableData={pageData.table} />
      </div>
    );
  }

  return <div>{"Hi :)"}</div>;
}
