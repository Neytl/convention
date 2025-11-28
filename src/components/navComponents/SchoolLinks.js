import Image from "next/image";
import "convention/app/css/nav.css";
import NavLink from "convention/components/navComponents/NavLink";

export default function SchoolLinks({ schoolData, loggedInUser }) {
  if (!loggedInUser) return null;

  let schoolName = schoolData.schoolName;
  if (!schoolName && loggedInUser.username != "Admin")
    schoolName = loggedInUser.username;

  if (!schoolName) return null;

  let schoolID = schoolData.schoolID;
  if (!schoolID) schoolID = loggedInUser.schoolID;

  if (!schoolID) return null;

  return (
    <div id="schoolLinksContainer">
      <div id="schoolLinksHeader">
        <Image src="/images/school.png" alt="School" width={30} height={30} />
        <span>{schoolName}</span>
      </div>
      <div id="schoolLinks">
        <NavLink
          name={"Students"}
          href={"/schoolStudents?school=" + schoolID}
          iconSrc={"/images/account.png"}
        />
        {schoolData.numStudents == 0 ? null : (
          <NavLink
            name={"Events"}
            href={"/schoolEvents?school=" + schoolID}
            iconSrc={"/images/event.png"}
          />
        )}
      </div>
    </div>
  );
}
