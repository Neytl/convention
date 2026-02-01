import "convention/app/css/print.css";
import SimpleImage from "convention/components/generalComponents/SimpleImage";

export default function SoloEventPrintEntry({ studentData, schoolSpecific }) {
  return (
    <div className="tableEntry">
      {schoolSpecific ? (
        <div className="tableEntryData schoolSpecific">
          <div className="primaryTableEntryData">
            <SimpleImage src={"/images/account.png"} width={25} height={25} />
            <span>{studentData.fullName}</span>
          </div>
        </div>
      ) : (
        <div className="tableEntryData">
          <div className="primaryTableEntryData">
            <SimpleImage src={"/images/account.png"} width={25} height={25} />
            <span>{studentData.fullName}</span>
          </div>
          <div>
            <SimpleImage src={"/images/school.png"} width={25} height={25} />
            <div className="studentEvents">{studentData.schoolName}</div>
          </div>
        </div>
      )}
    </div>
  );
}
