import Image from "next/image";
import "convention/app/css/nav.css";
import NavLink from "convention/components/NavLink";

export default function AdminLinks() {
  return (
    <div id="adminSchoolLinksContainer">
      <div id="adminSchoolLinksHeader">
        <Image src="/images/account.png" alt="account" width={30} height={30} />
        <span>Admin</span>
      </div>
      <div id="adminSchoolLinks">
        <NavLink name={"Schools"} href={"/"} iconSrc={"/images/school.png"} />
        <NavLink
          name={"Events"}
          href={"/adminEvents"}
          iconSrc={"/images/event.png"}
        />
      </div>
    </div>
  );
}
