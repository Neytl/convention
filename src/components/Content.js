"use client"
import Stats from "convention/components/Stats";
import Table from "convention/components/Table";

import { useState, useEffect } from "react";

export default function Content({
  dataEndpoint
}) {
  const [viewData, setViewData] = useState({});

  useEffect(() => {
    fetch("./fakeData/" + dataEndpoint + ".json")
      .then((response) => response.json())
      .then((data) => setViewData(data));
  });

  return (
    <div id="content">
      <Stats statsData={viewData.stats} />
      <Table tableColumns={viewData.columnNames} tableData={viewData.tableData} tableType={viewData.tableType} />
    </div>
  );
}
