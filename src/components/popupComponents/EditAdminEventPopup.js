import { onPopupInput } from "./Popup";

export default function EditAdminEventPopup({ updateDataEntry }) {
  const onSelectEditEventType = (eventType) => {
    document.getElementById("soloEventEdit").classList.remove("selected");
    document.getElementById("groupEventEdit").classList.remove("selected");
    document.getElementById("schoolEventEdit").classList.remove("selected");
    document.getElementById(eventType + "EventEdit").classList.add("selected");

    switch (eventType) {
      case "solo":
        document
          .getElementById("editMinTeamSizeContainer")
          .classList.add("hidden");
        document
          .getElementById("editMaxTeamSizeContainer")
          .classList.add("hidden");
        return;
      case "group":
        document
          .getElementById("editMinTeamSizeContainer")
          .classList.remove("hidden");
        document
          .getElementById("editMaxTeamSizeContainer")
          .classList.remove("hidden");
        return;
      case "school":
        document
          .getElementById("editMinTeamSizeContainer")
          .classList.remove("hidden");
        document
          .getElementById("editMaxTeamSizeContainer")
          .classList.add("hidden");
        return;
    }
  };

  const updateEvent = () => {
    let error = false;

    // Build the new event data payload
    let payload = {
      eventName: document.getElementById("editEventName").value,
      category: document.getElementById("editEventCategory").value,
      eventID: document.getElementById("editEventName").dataset.eventID,
    };

    if (
      document.getElementById("soloEventEdit").classList.contains("selected")
    ) {
      // Solo event
      payload.isTeamEvent = false;
      payload.isSchoolEvent = false;
      payload.minTeamSize = "1";
      payload.maxTeamSize = "1";
    } else if (
      document.getElementById("groupEventEdit").classList.contains("selected")
    ) {
      // Group event
      payload.isTeamEvent = true;
      payload.isSchoolEvent = false;
      payload.minTeamSize = document.getElementById(
        "editEventMinTeamSize",
      ).value;
      payload.maxTeamSize = document.getElementById(
        "editEventMaxTeamSize",
      ).value;
      if (!payload.minTeamSize) {
        document.getElementById("editEventMinTeamSize").classList.add("error");
        error = true;
      }
      if (!payload.maxTeamSize) {
        document.getElementById("editEventMaxTeamSize").classList.add("error");
        error = true;
      }
    } else {
      // School event
      payload.isTeamEvent = false;
      payload.isSchoolEvent = true;
      payload.minTeamSize = document.getElementById(
        "editEventMinTeamSize",
      ).value;
      payload.maxTeamSize = "1";
      if (!payload.minTeamSize) {
        document.getElementById("editEventMinTeamSize").classList.add("error");
        error = true;
      }
    }

    // Incomplete data
    if (!payload.eventName) {
      document.getElementById("editEventName").classList.add("error");
      error = true;
      return;
    }

    if (error) return;

    // Make the request
    updateDataEntry("event", "eventID", payload);
  };

  return (
    <div id="edit_admin_events_popup" className="hidden">
      <form className="popupFields">
        {/* Event Name */}
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editEventName">Nombre:</label>
          </div>
          <input
            onInput={clearError}
            type="text"
            id="editEventName"
            placeholder="Event Name"
            onKeyDown={onPopupInput}
            data-tab="B1"
          />
        </div>
        {/* Category */}
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editEventCategory">Categoria:</label>
          </div>
          <select
            id="editEventCategory"
            defaultValue={"Deportes"}
            className="popupSelect"
            onKeyDown={onPopupInput}
            data-tab="B2"
          >
            <option>Deportes</option>
            <option>Música</option>
            <option>Exhibiciones</option>
            <option>Concursos Académicos</option>
          </select>
        </div>
        {/* Event Type */}
        <div className="eventTypeButtons">
          <span
            id="soloEventEdit"
            className="selected"
            onClick={() => onSelectEditEventType("solo")}
          >
            Evento Solo
          </span>
          <span
            id="groupEventEdit"
            onClick={() => onSelectEditEventType("group")}
          >
            Equipos
          </span>
          <span
            id="schoolEventEdit"
            onClick={() => onSelectEditEventType("school")}
          >
            Grupo Escolar
          </span>
        </div>
        {/* Team Size */}
        <div id="editMinTeamSizeContainer">
          <div className="popupInputLabel">
            <label htmlFor="editEventMinTeamSize">
              Tamaño de Equipo Mínimo:
            </label>
          </div>
          <input
            type="number"
            id="editEventMinTeamSize"
            defaultValue={4}
            min={2}
            max={30}
            onKeyDown={onPopupInput}
            onInput={clearError}
            data-tab="B3"
          />
        </div>
        <div id="editMaxTeamSizeContainer">
          <div className="popupInputLabel">
            <label htmlFor="editEventMaxTeamSize">
              Tamaño de Equipo Máximo:
            </label>
          </div>
          <input
            type="number"
            id="editEventMaxTeamSize"
            defaultValue={4}
            min={2}
            max={100}
            onKeyDown={onPopupInput}
            onInput={clearError}
            data-tab="B4"
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div
          onClick={updateEvent}
          className="submitPopupButton"
          onKeyDown={onPopupInput}
          data-tab="B5"
          tabIndex={-1}
        >
          Actualizar
        </div>
      </div>
    </div>
  );
}

export const clearEventPopup = () => {
  document.getElementById("editEventName").value = "";
  document.getElementById("editEventMinTeamSize").value = 4;
  document.getElementById("editEventMaxTeamSize").value = 4;
};

function clearError(event) {
  event.target.classList.remove("error");
}
