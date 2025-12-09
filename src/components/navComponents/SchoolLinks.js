import "convention/app/css/nav.css";
import NavLink from "convention/components/navComponents/NavLink";

export default function SchoolLinks({ schoolData, loggedInUser, pathname }) {
  let schoolID = schoolData.schoolID;
  if (!schoolID) schoolID = loggedInUser.schoolID;
  if (!schoolID) return null;

  return (
    <div id="links">
      <div id="adminLinksContainer">
        <NavLink
          name={"Alumnos"}
          href={"/alumnos?school=" + schoolID}
          iconSrc={"/images/account.png"}
          currentPage={pathname == "/schoolStudents"}
        />
        {schoolData.numStudents > 0 ? (
          <NavLink
            name={"Eventos"}
            href={"/eventos?school=" + schoolID}
            iconSrc={"/images/event.png"}
            currentPage={pathname == "/schoolEvents"}
          />
        ) : null}
      </div>
    </div>
  );
}
