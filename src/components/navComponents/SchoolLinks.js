import "convention/app/css/nav.css";
import NavLink from "convention/components/navComponents/NavLink";

export default function SchoolLinks({ schoolData, loggedInUser }) {
  let schoolID = schoolData.schoolID;
  if (!schoolID) schoolID = loggedInUser.schoolID;
  if (!schoolID) return null;

  return (
    <div id="links">
      <div id="adminLinksContainer">
        <NavLink
          name={"Alumnos"}
          href={"/schoolStudents?school=" + schoolID}
          iconSrc={"/images/account.png"}
        />
        {schoolData.numStudents > 0 ? (
          <NavLink
            name={"Eventos"}
            href={"/schoolEvents?school=" + schoolID}
            iconSrc={"/images/event.png"}
          />
        ) : null}
      </div>
    </div>
  );
}
