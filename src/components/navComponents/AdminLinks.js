import "convention/app/css/nav.css";
import NavLink from "convention/components/navComponents/NavLink";

export default function AdminLinks() {
  return (
    <div id="adminLinksContainer">
      <NavLink name={"Schools"} href={"/"} iconSrc={"/images/school.png"} />
      <NavLink
        name={"All Events"}
        href={"/adminEvents"}
        iconSrc={"/images/event.png"}
      />
    </div>
  );
}
