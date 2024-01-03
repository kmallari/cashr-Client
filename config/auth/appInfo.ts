const PUBLIC_API_DOMAIN =
  process.env.PUBLIC_API_DOMAIN || "http://localhost:8080";
const PUBLIC_CLIENT_DOMAIN =
  process.env.PUBLIC_CLIENT_DOMAIN || "http://localhost:3000";

export const appInfo = {
  appName: "website",
  apiDomain: PUBLIC_API_DOMAIN,
  websiteDomain: PUBLIC_CLIENT_DOMAIN,
  apiBasePath: "/auth",
  websiteBasePath: "/auth",
};
