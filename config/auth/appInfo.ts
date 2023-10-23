const PUBLIC_API_DOMAIN =
  process.env.PUBLIC_API_DOMAIN || "http://localhost:8080";
const PUBLIC_CLIENT_DOMAIN =
  process.env.PUBLIC_CLIENT_DOMAIN || "http://localhost:3000";

export const appInfo = {
  appName: "website",
  apiDomain: PUBLIC_API_DOMAIN, // change to client domain if you want to just use NextJS
  websiteDomain: PUBLIC_CLIENT_DOMAIN,
  apiBasePath: "/auth",
  websiteBasePath: "/auth",
};
