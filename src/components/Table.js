import "convention/app/css/table.css";
import TableEntry from "./TableEntry";

export default function Table({
  tableColumns,
  tableData,
  tableType
}) {  
  if (!tableColumns) {
    return <div>Loading table data...</div>;
  }
  
  let rowIndex = 0;

  return (
    <div className="table">
      <div className="tableHeader">
        {
          tableColumns.map(columnName => (
            <span key={columnName}>{columnName}</span>
          ))
        }
      </div>
      <div className="tableEntries">
        {
          tableData.map(entryData => (
            <TableEntry key={rowIndex++} entryIconSrc="/images/school.png" dataEntries={Object.entries(entryData).map(a => a[1])} tableType={tableType} />
          ))
        }
      </div>
    </div>
  );
}
