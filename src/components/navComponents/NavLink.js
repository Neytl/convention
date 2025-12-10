import SimpleImage from "convention/components/generalComponents/SimpleImage";
import "convention/app/css/nav.css";
import nextConfig from "convention/../next.config.mjs";
const basePath = nextConfig.basePath;

export default function NavLink({ name, href, iconSrc, currentPage }) {
  return (
    <a
      className={currentPage ? "navLink currentPage" : "navLink"}
      href={basePath + href}
    >
      <SimpleImage src={iconSrc} width={20} height={20} />
      <span>{name}</span>
    </a>
  );
}
