import IconSpan from "../generalComponents/IconSpan";

export default function TableEntryButton({ imageSrc, text, onClick }) {
  return (
    <IconSpan
      imageSrc={imageSrc}
      text={text}
      specialClass="tableEntryButton"
      onClick={onClick}
    />
  );
}
