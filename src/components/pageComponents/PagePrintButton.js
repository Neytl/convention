import SimpleImage from "convention/components/generalComponents/SimpleImage";
import "convention/app/css/table.css";

export default function PagePrintButton({ pathName }) {
  let schoolID = JSON.parse(localStorage.getItem("pageSchoolData")).schoolID;

  switch (pathName) {
    case "/":
      return (
        <div
          id="pagePrintButton"
          className="pageButton"
          onClick={() => {
            window.open("imprimirEscuelas", "_blank");
          }}
        >
          <SimpleImage src={"/images/print.png"} width={20} height={20} />
        </div>
      );
    case "/adminEvents":
      return (
        <div
          id="pagePrintButton"
          className="pageButton"
          onClick={() => {
            window.open("imprimirEventos", "_blank");
          }}
        >
          <SimpleImage src={"/images/print.png"} width={20} height={20} />
        </div>
      );
    case "/schoolStudents":
      return (
        <div
          id="pagePrintButton"
          className="pageButton"
          onClick={() => {
            window.open("./imprimirEscuela?school=" + schoolID, "_blank");
          }}
        >
          <SimpleImage src={"/images/print.png"} width={20} height={20} />
        </div>
      );
    case "/schoolEvents":
      return (
        <div
          id="pagePrintButton"
          className="pageButton"
          onClick={() => {
            window.open("./imprimirEventos?school=" + schoolID, "_blank");
          }}
        >
          <SimpleImage src={"/images/print.png"} width={20} height={20} />
        </div>
      );
  }
}
