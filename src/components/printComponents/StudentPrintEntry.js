import "convention/app/css/print.css";
import Image from "next/image";

export default function StudentPrintEntry({ studentData }) {
  let events = <span>None</span>;

  if (studentData.events.length > 0) {
    let eventsList = studentData.events
      .map((events) => events.eventName)
      .join(", ");

    events = <span>{eventsList}</span>;
  }

  return (
    <div className="tableEntry">
      <div className="tableEntryData">
        <div className="primaryTableEntryData">
          <Image src={"/images/account.png"} alt="" width={30} height={30} />
          <span>{studentData.fullName}</span>
        </div>
        <span>{studentData.age}</span>
        <div>
          <Image src={"/images/event.png"} alt="" width={30} height={30} />
          <div className="studentEvents">{events}</div>
        </div>
      </div>
    </div>
  );
}
