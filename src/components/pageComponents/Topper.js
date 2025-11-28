import Image from "next/image";
import "convention/app/css/nav.css";
import { useEffect, useState } from "react";

export default function Topper() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    if (!!loggedInUser.username) return;
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
  }, [loggedInUser]);

  return (
    <div id="topper">
      <div id="user">
        <Image
          src="/images/account.png"
          className="invert"
          alt="School"
          width={20}
          height={20}
        />
        <span>{loggedInUser.username}</span>
      </div>
      <div id="tag">
        <Image
          src="/images/logo.png"
          className="invert"
          alt="School"
          width={42}
          height={42}
        />
        <span>Mini-Convention 2026</span>
      </div>
    </div>
  );
}
