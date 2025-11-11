export default function EditStudentPopup({ updateDataEntry }) {
  const updateStudent = () => {
    let payload = {
      studentID: document.getElementById("editFirstName").dataset.studentID,
      firstNames: document.getElementById("editFirstName").value,
      lastNames: document.getElementById("editLastName").value,
      birthdate: document.getElementById("editBirthdate").value,
    };

    // Incomplete data
    let errors = false;
    if (!payload.firstNames) {
      document.getElementById("firstName").classList.add("error");
      errors = true;
    }
    if (!payload.lastNames) {
      document.getElementById("lastName").classList.add("error");
      errors = true;
    }
    if (!!payload.birthdate) {
      const date = new Date(payload.birthdate);
      if (
        !(date instanceof Date && !isNaN(date) && date.getFullYear() > 2000)
      ) {
        document.getElementById("editBirthdate").classList.add("error");
        errors = true;
      }
    } else {
      document.getElementById("editBirthdate").classList.add("error");
      errors = true;
    }
    if (errors) return;

    // Make the request
    updateDataEntry("student", "studentID", payload);
  };

  return (
    <div id="edit_school_students_popup" className="hidden">
      <form className="popupFields">
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editFirstName">First Name:</label>
          </div>
          <input
            type="text"
            id="editFirstName"
            placeholder="First Name"
            onInput={clearError}
          />
        </div>
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editLastName">Last Name:</label>
          </div>
          <input
            type="text"
            id="editLastName"
            placeholder="Last Name"
            onInput={clearError}
          />
        </div>
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editBirthdate">Birthdate:</label>
          </div>
          <input
            type="text"
            id="editBirthdate"
            placeholder="DD/MM/YYYY"
            onInput={clearError}
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div onClick={updateStudent} className="submitPopupButton">
          Update
        </div>
      </div>
    </div>
  );
}

function clearError(event) {
  event.target.classList.remove("error");
}
