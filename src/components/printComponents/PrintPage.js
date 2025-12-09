"use client";
import "convention/app/css/print.css";
import { useState, useEffect } from "react";
import SchoolPrintTable from "./SchoolPrintTable";
import EventPrintTable from "./EventPrintTable";
import {
  getLoggedInUserHeaders,
  notAuthorized,
} from "../pageComponents/Content";
import PrintButton from "./PrintButton";

export default function PrintPage() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("loggedInUser")) {
      window.location.href = "/";
      return;
    }

    console.log("loading...");
    let pathName = window.location.pathname;

    if (window.location.pathname == "/printSchools") {
      fetch(
        "https://mini-convention-beedavbxfwa0fdcj.mexicocentral-01.azurewebsites.net/api/MiniConvention/schoolsTables",
        getLoggedInUserHeaders()
      )
        .then((response) => response.json())
        .then((data) => {
          if (notAuthorized(data)) return;

          let pageData = {
            pathName: pathName,
            tables: data,
          };

          setPageData(pageData);
        });
    } else if (window.location.pathname == "/printSchool") {
      let queryStringSchoolID = new URLSearchParams(window.location.search).get(
        "school"
      );

      fetch(
        "https://mini-convention-beedavbxfwa0fdcj.mexicocentral-01.azurewebsites.net/api/MiniConvention/schoolTable/" +
          queryStringSchoolID,
        getLoggedInUserHeaders()
      )
        .then((response) => response.json())
        .then((data) => {
          if (notAuthorized(data)) return;

          let pageData = {
            pathName: pathName,
            table: data,
          };

          console.log(pageData);
          setPageData(pageData);
        });
    } else if (window.location.pathname == "/printEvents") {
      fetch(
        "https://mini-convention-beedavbxfwa0fdcj.mexicocentral-01.azurewebsites.net/api/MiniConvention/eventsTables",
        getLoggedInUserHeaders()
      )
        .then((response) => response.json())
        .then((data) => {
          if (notAuthorized(data)) return;

          let pageData = {
            pathName: pathName,
            tables: data,
          };

          setPageData(pageData);
        });
    } else if (window.location.pathname == "/printEvent") {
      let queryStringSchoolID = new URLSearchParams(window.location.search).get(
        "event"
      );

      fetch(
        "https://mini-convention-beedavbxfwa0fdcj.mexicocentral-01.azurewebsites.net/api/MiniConvention/eventTable/" +
          queryStringSchoolID,
        getLoggedInUserHeaders()
      )
        .then((response) => response.json())
        .then((data) => {
          if (notAuthorized(data)) return;

          let pageData = {
            pathName: pathName,
            table: data,
          };

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

    return (
      <div id="pageContainer">
        {tables}
        <PrintButton />
      </div>
    );
  } else if (pageData.pathName == "/printSchool") {
    return (
      <div id="pageContainer">
        <SchoolPrintTable tableData={pageData.table} />
        <PrintButton />
      </div>
    );
  } else if (window.location.pathname == "/printEvents") {
    let tables = [];
    let sectionTables = [];
    let currentCategory = "";

    const buildSectionColumns = (sectionTables) => {
      if (sectionTables.length == 0) return;

      // Get the total height
      let totalHeight = 0;
      sectionTables.forEach((sectionTable) => {
        totalHeight += parseInt(sectionTable.key.split("$")[0]);
      });

      totalHeight -= 2;
      let runningHeight = 0;
      let columnOne = [];
      let columnTwo = [];
      let split = false;
      sectionTables.forEach((sectionTable) => {
        if (split) {
          columnTwo.push(sectionTable);
        } else {
          runningHeight += parseInt(sectionTable.key.split("$")[0]);
          if (runningHeight > totalHeight / 2) split = true;
          columnOne.push(sectionTable);
        }
      });

      return (
        <div key={currentCategory + "headerer"} className="printEventsColumns">
          <div>{columnOne}</div>
          <div>{columnTwo}</div>
        </div>
      );
    };

    pageData.tables.forEach((tableData) => {
      if (tableData.tableData.length == 0) return;

      // Look for a new section
      if (tableData.tableCategory != currentCategory) {
        // Biuld the section columns
        tables.push(buildSectionColumns(sectionTables, currentCategory));

        // Add the new section header
        currentCategory = tableData.tableCategory;
        sectionTables = [];
        tables.push(
          <div className="eventCategoryPrint Header" key={currentCategory}>
            {currentCategory}
          </div>
        );
      }

      let height = tableData.tableData.length + 2;
      sectionTables.push(
        <EventPrintTable
          tableData={tableData}
          key={height + "$" + tableData.tableEventID}
        />
      );
    });

    tables.push(buildSectionColumns(sectionTables, currentCategory));

    return (
      <div id="pageContainer" className="eventsPrintPage">
        {tables}
        <PrintButton />
      </div>
    );
  } else if (window.location.pathname == "/printEvent") {
    return (
      <div id="pageContainer">
        <EventPrintTable tableData={pageData.table} />
        <PrintButton />
      </div>
    );
  }

  return <div>Cargando...</div>;
}
