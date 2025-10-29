"use client";
import Stats from "convention/components/Stats";
import Table from "convention/components/Table";

import { useState, useEffect } from "react";

export default function Content({ dataEndpoint }) {
  const [viewData, setViewData] = useState({
    tables: [],
  });

  useEffect(() => {
    if (!!viewData.stats) return;
    fetch("./fakeData/" + dataEndpoint + ".json")
      .then((response) => response.json())
      .then((data) => {
        setViewData(data);
      });
  });

  return (
    <div id="content">
      <Stats statsData={viewData.stats} />
      {viewData.tables.map((table) => (
        <Table
          key={table.tableName}
          tableColumns={table.columnNames}
          tableData={table.tableData}
          tableType={table.tableType}
          tableName={table.tableName}
          maxTeamSize={table.maxTeamSize}
        />
      ))}
    </div>
  );
}
