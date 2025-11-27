import Image from "next/image";
import "convention/app/css/nav.css";
import NavLink from "convention/components/navComponents/NavLink";

export default function SchoolLinks({ schoolData }) {
  if (!schoolData) return null;

  return (
    <div id="schoolLinksContainer">
      <div id="schoolLinksHeader">
        <Image src="/images/school.png" alt="School" width={30} height={30} />
        <span>{schoolData.schoolName}</span>
      </div>
      <div id="schoolLinks">
        <NavLink
          name={"Students"}
          href={"/schoolStudents?school=" + schoolData.schoolID}
          iconSrc={"/images/account.png"}
        />
        {schoolData.numStudents == 0 ? null : (
          <NavLink
            name={"Events"}
            href={"/schoolEvents?school=" + schoolData.schoolID}
            iconSrc={"/images/event.png"}
          />
        )}
      </div>
    </div>
  );
}
