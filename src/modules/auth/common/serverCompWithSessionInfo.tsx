import { getSSRSession } from "@/app/sessionHandlers";

import { TryRefreshOnClient } from "./tryRefreshOnClient";

export async function ServerCompWithSessionInfo() {
  const { session, hasToken } = await getSSRSession();

  if (!session) {
    if (!hasToken) {
      // Here you can redirect the user if you prefer.
      return <p>No session in the server side component.</p>;
    }
    return <TryRefreshOnClient />;
  }

  return <p>Server side component got userId: {session.getUserId()}</p>;
}
