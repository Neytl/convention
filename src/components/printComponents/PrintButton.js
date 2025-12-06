import IconSpan from "../generalComponents/IconSpan";

export default function PrintButton() {
  return (
    <div id="printButton">
      <IconSpan
        imageSrc={"/images/print.png"}
        text={"Imprimir"}
        specialClass="tableEntryButton"
        onClick={() => {
          window.print();
        }}
      />
    </div>
  );
}
