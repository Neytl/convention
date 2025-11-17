// import Image from "next/image";
import { useEffect, useState } from "react";
import TinyImage from "./TinyImage";

export default function AddSchoolEventPopup() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44398/api/MiniConvention/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  let popupElements = [];
  let currentCategory;

  events.forEach((event) => {
    if (event.category != currentCategory) {
      currentCategory = event.category;
      popupElements.push(
        <div className="eventCategoryPopupHeader" key={currentCategory}>
          {currentCategory}
        </div>
      );
    }

    popupElements.push(
      <div
        key={event.eventID}
        className="eventLink"
        onClick={() => {
          console.log(event);
        }}
      >
        <TinyImage imageSrc="/images/event.png" />
        <div>{event.eventName}</div>
      </div>
    );
  });

  return (
    <div id="add_school_event_popup" className="?hidden">
      <form className="popupFields" id="eventsListConatiner">
        {popupElements}
      </form>
    </div>
  );
}
