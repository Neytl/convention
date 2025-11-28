import "convention/app/css/nav.css";
import SchoolLinks from "convention/components/navComponents/SchoolLinks";
import AdminLinks from "convention/components/navComponents/AdminLinks";
import { useEffect, useState } from "react";

export default function Nav({ pageSchoolData }) {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    if (!!loggedInUser.username) return;
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
  }, [loggedInUser]);

  return (
    <div id="header">
      <div id="links">
        {!loggedInUser.adminAccess ? null : <AdminLinks />}
        <SchoolLinks schoolData={pageSchoolData} loggedInUser={loggedInUser} />
      </div>
    </div>
  );
}
