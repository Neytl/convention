import { onPopupInput } from "./Popup";

export default function AddEventPopup({ postNewData }) {
  const onSelectEventType = (eventType) => {
    document.getElementById("soloEvent").classList.remove("selected");
    document.getElementById("groupEvent").classList.remove("selected");
    document.getElementById("schoolEvent").classList.remove("selected");
    document.getElementById(eventType + "Event").classList.add("selected");

    switch (eventType) {
      case "solo":
        document.getElementById("minTeamSizeContainer").classList.add("hidden");
        document.getElementById("maxTeamSizeContainer").classList.add("hidden");
        return;
      case "group":
        document
          .getElementById("minTeamSizeContainer")
          .classList.remove("hidden");
        document
          .getElementById("maxTeamSizeContainer")
          .classList.remove("hidden");
        return;
      case "school":
        document
          .getElementById("minTeamSizeContainer")
          .classList.remove("hidden");
        document.getElementById("maxTeamSizeContainer").classList.add("hidden");
        return;
    }
  };

  const addNewEvent = () => {
    let error = false;

    // Build the new event data payload
    let payload = {
      eventName: document.getElementById("eventName").value,
      category: document.getElementById("eventCategory").value,
    };

    if (document.getElementById("soloEvent").classList.contains("selected")) {
      // Solo event
      payload.isTeamEvent = false;
      payload.isSchoolEvent = false;
      payload.minTeamSize = "1";
      payload.maxTeamSize = "1";
    } else if (
      document.getElementById("groupEvent").classList.contains("selected")
    ) {
      // Group event
      payload.isTeamEvent = true;
      payload.isSchoolEvent = false;
      payload.minTeamSize = document.getElementById("eventMinTeamSize").value;
      payload.maxTeamSize = document.getElementById("eventMaxTeamSize").value;
      if (!payload.minTeamSize) {
        document.getElementById("eventMinTeamSize").classList.add("error");
        error = true;
      }
      if (!payload.maxTeamSize) {
        document.getElementById("eventMaxTeamSize").classList.add("error");
        error = true;
      }
    } else {
      // School event
      payload.isTeamEvent = false;
      payload.isSchoolEvent = true;
      payload.minTeamSize = document.getElementById("eventMinTeamSize").value;
      payload.maxTeamSize = "1";
      if (!payload.minTeamSize) {
        document.getElementById("eventMinTeamSize").classList.add("error");
        error = true;
      }
    }

    // Incomplete data
    if (!payload.eventName) {
      document.getElementById("eventName").classList.add("error");
      error = true;
    }

    if (error) return;

    // Make the request
    postNewData("event", payload);
  };

  return (
    <div id="admin_events_popup" className="hidden">
      <form className="popupFields">
        {/* Event Name */}
        <div>
          <div className="popupInputLabel">
            <label htmlFor="eventName">Nombre:</label>
          </div>
          <input
            onInput={clearError}
            type="text"
            id="eventName"
            placeholder="Nombre del evento"
            onKeyDown={onPopupInput}
            data-tab="A1"
          />
        </div>
        {/* Category */}
        <div>
          <div className="popupInputLabel">
            <label htmlFor="eventCategory">Categoria:</label>
          </div>
          <select
            id="eventCategory"
            defaultValue={"Deportes"}
            className="popupSelect"
            onKeyDown={onPopupInput}
            data-tab="A2"
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
            id="soloEvent"
            className="selected"
            onClick={() => onSelectEventType("solo")}
          >
            Evento Solo
          </span>
          <span id="groupEvent" onClick={() => onSelectEventType("group")}>
            Equipos
          </span>
          <span id="schoolEvent" onClick={() => onSelectEventType("school")}>
            Grupo Escolar
          </span>
        </div>
        {/* Team Size */}
        <div id="minTeamSizeContainer">
          <div className="popupInputLabel">
            <label htmlFor="eventMinTeamSize">Tamaño de Equipo Mínimo:</label>
          </div>
          <input
            type="number"
            id="eventMinTeamSize"
            defaultValue={4}
            min={2}
            max={30}
            onKeyDown={onPopupInput}
            onInput={clearError}
            data-tab="A3"
          />
        </div>
        <div id="maxTeamSizeContainer">
          <div className="popupInputLabel">
            <label htmlFor="eventMaxTeamSize">Tamaño de Equipo Máximo:</label>
          </div>
          <input
            type="number"
            id="eventMaxTeamSize"
            defaultValue={4}
            min={2}
            max={100}
            onKeyDown={onPopupInput}
            onInput={clearError}
            data-tab="A4"
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div
          onClick={addNewEvent}
          className="submitPopupButton"
          onKeyDown={onPopupInput}
          data-tab="A5"
          tabIndex={-1}
        >
          Registrar
        </div>
      </div>
    </div>
  );
}

export const clearEventPopup = () => {
  document.getElementById("eventName").value = "";
  document.getElementById("eventMinTeamSize").value = 4;
  document.getElementById("eventMaxTeamSize").value = 4;
};

function clearError(event) {
  event.target.classList.remove("error");
}
