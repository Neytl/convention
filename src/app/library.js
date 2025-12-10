import nextConfig from "convention/../next.config.mjs";
const basePath = nextConfig.basePath;
export const goHome = () => {
  window.location.href = basePath + "/";
};
export const goToPage = (page) => {
  window.location.href = basePath + page;
};
export const getCurrentPage = () => {
  return window.location.pathname.substring(basePath.length);
};
