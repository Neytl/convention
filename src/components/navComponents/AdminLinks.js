import "convention/app/css/nav.css";
import NavLink from "convention/components/navComponents/NavLink";
import Image from "next/image";

export default function AdminLinks({ schoolData, loggedInUser, pathname }) {
  let schoolID = schoolData.schoolID;
  if (!schoolID) schoolID = loggedInUser.schoolID;
  let schoolName = schoolData.schoolName;

  return (
    <div id="links">
      <div id="adminLinksContainer">
        <NavLink
          name={"Escuelas"}
          href={"/adminSchools"}
          iconSrc={"/images/school.png"}
          currentPage={pathname == "/"}
        />
        <NavLink
          name={"Eventos"}
          href={"/adminEvents"}
          iconSrc={"/images/event.png"}
          currentPage={pathname == "/adminEvents"}
        />
      </div>
      {!schoolName ? null : (
        <div
          id="schoolLinksContainer"
          className={
            pathname == "/schoolStudents" || pathname == "/schoolEvents"
              ? "currentPage"
              : ""
          }
        >
          <div id="schoolLinksHeader">
            <Image
              src="/images/school.png"
              alt="School"
              width={30}
              height={30}
            />
            <span>{schoolName}</span>
          </div>
          <div id="schoolLinks">
            <NavLink
              name={"Alumnos"}
              href={"/schoolStudents?school=" + schoolID}
              iconSrc={"/images/account.png"}
              currentPage={pathname == "/schoolStudents"}
            />
            {schoolData.numStudents > 0 ? (
              <NavLink
                name={"Eventos - Registro"}
                href={"/schoolEvents?school=" + schoolID}
                iconSrc={"/images/event.png"}
                currentPage={pathname == "/schoolEvents"}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
