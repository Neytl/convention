import "convention/app/css/table.css";
import IconSpan from "../generalComponents/IconSpan";
import Image from "next/image";

export default function ParticipantIcon({ index, schoolName, fullName, age }) {
  return (
    <div className="participantIcon">
      <span>{index + "."}</span>
      <div className="iconSpan">
        <Image src={"/images/account.png"} alt="" width={20} height={20} />
        <span>{fullName}</span>
        <span className="faded">{"(" + age + ")"}</span>
      </div>
      <IconSpan imageSrc="/images/school.png" text={schoolName} />
    </div>
  );
}
