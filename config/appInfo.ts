const PUBLIC_API_DOMAIN =
  process.env.PUBLIC_API_DOMAIN || "http://localhost:3000";
const PUBLIC_CLIENT_DOMAIN =
  process.env.PUBLIC_CLIENT_DOMAIN || "http://localhost:3000";

export const appInfo = {
  appName: "supertokens-prac",
  apiDomain: PUBLIC_CLIENT_DOMAIN,
  websiteDomain: PUBLIC_CLIENT_DOMAIN,
  apiBasePath: "/api/auth",
  websiteBasePath: "/login",
};
