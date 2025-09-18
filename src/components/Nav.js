import Image from "next/image";
import "convention/app/css/nav.css";
import Link from "next/link";

export default function Nav() {
  return (
    <div id="header">
      <div id="user">
        <Image src="/images/school.png" alt="School" width={30} height={30} />
        <span>School Name</span>
      </div>
      <div id="links">
        <Link href={"/"}>Schools</Link>
        <Link href={"/adminEvents"}>Events</Link>
      </div>
    </div>
  );
}
