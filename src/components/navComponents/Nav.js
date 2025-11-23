import "convention/app/css/nav.css";
import NavLink from "convention/components/navComponents/NavLink";
import AdminSchoolLinks from "convention/components/navComponents/AdminSchoolLinks";
import AdminLinks from "convention/components/navComponents/AdminLinks";

export default function Nav({ pageSchoolData }) {
  return (
    <div id="header">
      <div id="links">
        <NavLink name={"Schools"} href={"/"} iconSrc={"/images/school.png"} />
        <NavLink
          name={"Events"}
          href={"/adminEvents"}
          iconSrc={"/images/event.png"}
        />
        <AdminSchoolLinks schoolData={pageSchoolData} />
      </div>
    </div>
  );
}
