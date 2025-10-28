import { subDomainList } from "./constant";

// In localhost - http://url.localhost:5173/s/abc123 --> -1
// In production - https://url.shortlytics.com/s/abc123 --> -2
export const getSubDomain = (hostname) => {
  const locationParts = hostname.split(".");
  const isLocalhost = locationParts.slice(-1)[0] === "localhost";
  const sliceTill = isLocalhost ? -1 : -2;
  return locationParts.slice(0, sliceTill).join("");
};

export const getApps = () => {
  const subdomain = getSubDomain(window.location.hostname);

  const mainApp = subDomainList.find((app) => app.main);
  if (subdomain === "") return mainApp.app;

  const apps = subDomainList.find((app) => subdomain === app.subdomain);
  return apps ? apps.app : mainApp.app;
};
