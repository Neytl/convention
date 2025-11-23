import "convention/app/css/print.css";
import "convention/app/css/table.css";
import StudentPrintEntry from "./StudentPrintEntry";
import Stat from "../pageComponents/Stat";
import Stats from "../pageComponents/Stats";

export default function SchoolPrintTable({ tableData }) {
  // Empty table
  if (tableData.tableData.length == 0) {
    return;
  }

  // Build the table entries
  let tableEntries = [];

  tableData.tableData.forEach((studentData) => {
    tableEntries.push(
      <StudentPrintEntry
        studentData={studentData}
        key={studentData.studentID}
      />
    );
  });

  // Bulid the table
  return (
    <div className="printTableContainer">
      <div className="schoolHeader">{tableData.tableName}</div>
      <Stats statsData={tableData.printStats} />
      <div className="schoolPrintTable">
        <div className="tableHeader">
          <span>Name</span>
          <span>Age</span>
          <span>Events</span>
        </div>
        <div>{tableEntries}</div>
      </div>
    </div>
  );
}
