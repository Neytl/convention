import Image from "next/image";
import IconSpan from "./IconSpan";
import TableEntryButton from "./TableEntryButton";
import "convention/app/css/table.css";
import { openTableButtonPopup } from "./Popup";

export default function TableEntry({
  entryIconSrc,
  data,
  tableType,
  rowIndex,
}) {
  return (
    <div className="tableEntry closed" id={"entry" + rowIndex}>
      {lookupTableEntryData(tableType, data, entryIconSrc)}
      {lookupTableEntryDropdown(tableType, data, rowIndex)}
    </div>
  );
}

function lookupTableEntryData(tableType, data, entryIconSrc) {
  const onclickEntry = (event) => {
    let target = event.target.closest(".tableEntry");

    if (target.classList.toggle("closed")) {
      target.style.height = target.children[0].offsetHeight + "px";
    } else {
      target.style.height =
        target.children[0].offsetHeight +
        target.children[1].offsetHeight +
        "px";
    }
  };

  let columnIndex = 0;

  switch (tableType) {
    case "admin_schools":
      return (
        <div className="tableEntryData" onClick={onclickEntry}>
          <div className="primaryTableEntryData">
            <Image src={entryIconSrc} alt="" width={30} height={30} />
            <span>{data.schoolName}</span>
          </div>
          <span key={columnIndex++}>{data.numStudents}</span>
        </div>
      );
    case "admin_events":
      return (
        <div className="tableEntryData" onClick={onclickEntry}>
          <div className="primaryTableEntryData">
            <Image src={entryIconSrc} alt="" width={30} height={30} />
            <span>{data.eventName}</span>
          </div>
          <span key={columnIndex++}>{data.participants.length}</span>
          <span key={columnIndex++}>{data.teamSize}</span>
          <span key={columnIndex++}>{data.category}</span>
        </div>
      );
    case "school_event":
    case "school_team_event":
    case "school_students":
    default:
      let dataEntries = Object.entries(data).map((a) => a[1]);

      return (
        <div className="tableEntryData" onClick={onclickEntry}>
          <div className="primaryTableEntryData">
            <Image src={entryIconSrc} alt="" width={30} height={30} />
            <span>{dataEntries[0]}</span>
          </div>
          {dataEntries.slice(1).map((dataValue) => (
            <span key={columnIndex++}>{dataValue}</span>
          ))}
        </div>
      );
  }
}

function lookupTableEntryDropdown(tableType, data, rowIndex) {
  let dataEntries = Object.entries(data).map((a) => a[1]);

  switch (tableType) {
    case "admin_schools":
      return generateAdminSchoolEntryDropdown(tableType, data, rowIndex);
    case "admin_events":
      return generateAdminEventsEntryDropdown(tableType, data, rowIndex);
    case "school_event":
    case "school_team_event":
      return generateSchoolEventsEntryDropdown(
        tableType,
        dataEntries,
        rowIndex
      );
    case "school_students":
    default:
      return generateSchoolStudentsEntryDropdown(
        tableType,
        dataEntries,
        rowIndex
      );
  }
}

function generateAdminSchoolEntryDropdown(tableType, data, rowIndex) {
  let printSchoolData = function () {
    // TODO
    console.log("Printing out '" + data.schoolName + "' school data...");
  };

  let editSchoolData = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");
    let input = document.getElementById("editSchoolName");
    input.value = data.schoolName;
    input.dataset.schooID = data.schoolName;
  };

  let deleteSchool = function (event) {
    if (confirm("Are you sure you want to delete '" + data.schoolName + "'?")) {
      let body = {
        schoolName: data.schoolName,
      };
      console.log("Fetch Delete School", body);

      let elementToDelete = document.getElementById("entry" + rowIndex);
      console.log("entry" + rowIndex, elementToDelete);
      elementToDelete.parentElement.removeChild(elementToDelete);
    }
  };

  let viewStudents = function () {
    // TODO - link to the right school
    window.location.href = "./schoolStudents";
  };

  return (
    <div className="tableEntryDropdown">
      <div className="schoolLoginInfo">
        <IconSpan imageSrc="/images/account.png" text="Username:" />
        <span>{data.username}</span>
        <IconSpan imageSrc="/images/password.png" text="Password:" />
        <span>{data.password}</span>
      </div>
      <div className="tableEntryDropdownButtons">
        <TableEntryButton
          imageSrc="/images/print.png"
          text="Print"
          onClick={printSchoolData}
        />
        <TableEntryButton
          imageSrc="/images/edit.png"
          text="Edit"
          onClick={editSchoolData}
        />
        <TableEntryButton
          imageSrc="/images/delete.png"
          text="Delete"
          onClick={deleteSchool}
        />
        <TableEntryButton
          imageSrc="/images/account.png"
          text="Students"
          onClick={viewStudents}
        />
      </div>
    </div>
  );
}

function generateAdminEventsEntryDropdown(tableType, data, columnIndex) {
  let printEvent = function () {
    // TODO
    console.log("Printing out '" + data.eventName + "' event data...");
  };

  let editEvent = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");

    let input = document.getElementById("editEventName");
    input.value = data.eventName;
    input.dataset.eventID = data.eventName;

    if (data.teamSize != "-") {
      // Teams
      document.getElementById("editEventHasTeams").checked = true;
      document
        .getElementById("editTeamSizeContainer")
        .classList.remove("hidden");
      document.getElementById("editEventTeamSize").value = parseInt(
        data.teamSize
      );
    } else {
      document.getElementById("editEventHasTeams").checked = false;
      document.getElementById("editTeamSizeContainer").classList.add("hidden");
    }

    // TODO - set the event category
    // ...
  };

  let deleteEvent = function (event) {
    if (confirm("Are you sure you want to delete '" + data.eventName + "'?")) {
      let body = {
        eventName: data.eventName,
      };
      console.log("Fetch Delete Event", body);

      let elementToDelete = document.getElementById("entry" + columnIndex);
      elementToDelete.parentElement.removeChild(elementToDelete);
    }
  };

  return (
    <div className="tableEntryDropdown">
      <div className="eventParticipants">
        <IconSpan
          imageSrc="/images/account.png"
          text="Student 1 - New School"
        />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
        <IconSpan
          imageSrc="/images/account.png"
          text="Student 2 - Harmony School"
        />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
      </div>
      <div className="tableEntryDropdownButtons">
        <TableEntryButton
          onClick={printEvent}
          imageSrc="/images/print.png"
          text="Print"
        />
        <TableEntryButton
          onClick={editEvent}
          imageSrc="/images/edit.png"
          text="Edit"
        />
        <TableEntryButton
          onClick={deleteEvent}
          imageSrc="/images/delete.png"
          text="Delete"
        />
      </div>
    </div>
  );
}

function generateSchoolStudentsEntryDropdown(tableType, data, columnIndex) {
  let editStudent = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");
    console.log(data);

    let input = document.getElementById("editFirstName");
    input.value = data[0];
    input.dataset.studentID = data[0];

    document.getElementById("editLastName").value = data[1];
    document.getElementById("editBirthdate").value = "";
  };

  let deleteStudent = function (event) {
    if (confirm("Are you sure you want to delete '" + data[0] + "'?")) {
      let body = {
        studentID: data[0],
      };
      console.log("Fetch Delete Student", body);

      let elementToDelete = document.getElementById("entry" + columnIndex);
      elementToDelete.parentElement.removeChild(elementToDelete);
    }
  };

  return (
    <div className="tableEntryDropdown">
      <div className="eventParticipants">
        <IconSpan imageSrc="/images/event.png" text="Event 1" />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
        <IconSpan imageSrc="/images/event.png" text="Event 2" />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
        <IconSpan imageSrc="/images/event.png" text="Event 3" />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
      </div>
      <div className="tableEntryDropdownButtons">
        <TableEntryButton
          onClick={editStudent}
          imageSrc="/images/edit.png"
          text="Student"
        />
        <TableEntryButton
          onClick={deleteStudent}
          imageSrc="/images/delete.png"
          text="Delete"
        />
      </div>
    </div>
  );
}

function generateSchoolEventsEntryDropdown(tableType, data, columnIndex) {
  let removeStudent = function (event) {
    let body = {
      studentID: data[0],
    };
    console.log("Fetch Delete Student", body);

    let elementToDelete = document.getElementById("entry" + columnIndex);

    if (elementToDelete.parentElement.children.length == 1) {
      elementToDelete =
        elementToDelete.parentElement.parentElement.parentElement;
    }

    elementToDelete.parentElement.removeChild(elementToDelete);
  };

  return (
    <div className="tableEntryDropdown">
      <div className="tableEntryDropdownButtons">
        <TableEntryButton
          onClick={removeStudent}
          imageSrc="/images/delete.png"
          text="Remove"
        />
      </div>
    </div>
  );
}
