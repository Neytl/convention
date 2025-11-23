import Image from "next/image";
import "convention/app/css/table.css";

export default function IconSpan({ imageSrc, text, specialClass, onClick }) {
  let classes = "iconSpan";
  if (!!specialClass) classes += " " + specialClass;

  return (
    <div className={classes} onClick={onClick}>
      <Image src={imageSrc} alt="" width={20} height={20} />
      <span>{text}</span>
    </div>
  );
}
