import "convention/app/css/nav.css";
import SchoolLinks from "convention/components/navComponents/SchoolLinks";
import AdminLinks from "convention/components/navComponents/AdminLinks";

export default function Nav({ pageSchoolData }) {
  return (
    <div id="header">
      <div id="links">
        <AdminLinks />
        <SchoolLinks schoolData={pageSchoolData} />
      </div>
    </div>
  );
}
