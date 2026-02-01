import SoloEventPrintTable from "./SoloEventPrintTable";
import TeamEventPrintTable from "./TeamEventPrintTable";

export default function EventPrintTable({ tableData, schoolSpecific }) {
  // Empty table
  if (tableData.tableData.length == 0) {
    return;
  }

  if (tableData.tableType == "event") {
    return (
      <SoloEventPrintTable
        tableData={tableData}
        schoolSpecific={schoolSpecific}
      />
    );
  }

  return <TeamEventPrintTable tableData={tableData} />;
}
