import "convention/app/css/nav.css";
import NavLink from "convention/components/navComponents/NavLink";
import Image from "next/image";

export default function AdminLinks({ schoolData, loggedInUser }) {
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
        />
        <NavLink
          name={"Eventos"}
          href={"/adminEvents"}
          iconSrc={"/images/event.png"}
        />
      </div>
      {!schoolName ? null : (
        <div id="schoolLinksContainer">
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
            />
            {schoolData.numStudents > 0 ? (
              <NavLink
                name={"Eventos - Registro"}
                href={"/schoolEvents?school=" + schoolID}
                iconSrc={"/images/event.png"}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
