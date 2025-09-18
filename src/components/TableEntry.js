import Image from "next/image";
import "convention/app/css/table.css";

export default function TableEntry({
  entryIconSrc,
  dataEntries,
  tableType
}) {
  let columnIndex = 0;

  return (
    <div className="tableEntry">
      <div className="tableEntryData">
        <div className="primaryTableEntryData">
          <Image src={entryIconSrc} alt="" width={30} height={30} />
          <span>{dataEntries[0]}</span>
        </div>
        {
          dataEntries.slice(1).map(dataValue => (
            <span key={columnIndex++}>{dataValue}</span>
          ))
        }
      </div>

      <div></div>
    </div>
  );
}
