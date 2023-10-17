import { getSSRSession } from "@/app/sessionHandlers";

import styles from "../app/styles/Home.module.css";
import { TryRefreshOnClient } from "./tryRefreshOnClient";

export async function ServerCompWithSessionInfo() {
  const { session, hasToken } = await getSSRSession();

  if (!session) {
    if (!hasToken) {
      // Here you can redirect the user if you prefer.
      return (
        <p className={styles.description}>
          No session in the server side component.
        </p>
      );
    }
    return <TryRefreshOnClient />;
  }

  return (
    <p className={styles.description}>
      Server side component got userId: {session.getUserId()}
    </p>
  );
}
