import Image from "next/image";
import "convention/app/css/nav.css";

export default function NavLink({ name, href, iconSrc, currentPage }) {
  return (
    <a className={currentPage ? "navLink currentPage" : "navLink"} href={href}>
      <Image src={iconSrc} alt="" width={20} height={20} />
      <span>{name}</span>
    </a>
  );
}
