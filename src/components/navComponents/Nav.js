import "convention/app/css/nav.css";
import SchoolLinks from "convention/components/navComponents/SchoolLinks";
import AdminLinks from "convention/components/navComponents/AdminLinks";
import { useEffect, useState } from "react";

export default function Nav({ pageSchoolData, pathname }) {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    if (!loggedInUser || !!loggedInUser.username) return;
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
  }, [loggedInUser]);

  if (!loggedInUser) return null;

  return (
    <div id="header">
      <div id="links">
        {!loggedInUser.adminAccess ? (
          <SchoolLinks
            schoolData={pageSchoolData}
            loggedInUser={loggedInUser}
            pathname={pathname}
          />
        ) : (
          <AdminLinks
            schoolData={pageSchoolData}
            loggedInUser={loggedInUser}
            pathname={pathname}
          />
        )}
      </div>
    </div>
  );
}
