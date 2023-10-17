"use client";

import React from "react";
import { redirectToAuth } from "supertokens-auth-react";
import {
  SessionAuth,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import styles from "../app/styles/Home.module.css";

function ProtectedPage() {
  const session = useSessionContext();

  async function logoutClicked() {
    await ThirdPartyEmailPassword.signOut();
    redirectToAuth();
  }

  async function fetchUserData() {
    const res = await fetch("/api/user");
    if (res.status === 200) {
      const json = await res.json();
      alert(JSON.stringify(json));
    }
  }

  if (session.loading === true) {
    return null;
  }

  return (
    <>
      <p className={styles.description}>
        UserId on the client-side: {session.userId}
      </p>
      <p className={styles.description}>
        Access token payload count:
        {JSON.stringify(session.accessTokenPayload.count ?? 0)}
      </p>
      <div
        style={{
          display: "flex",
          height: "70px",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingLeft: "75px",
          paddingRight: "75px",
        }}
      >
        <div
          onClick={logoutClicked}
          style={{
            display: "flex",
            width: "116px",
            height: "42px",
            backgroundColor: "#000000",
            borderRadius: "10px",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          SIGN OUT
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: "70px",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingLeft: "75px",
          paddingRight: "75px",
        }}
      >
        <div
          onClick={fetchUserData}
          style={{
            display: "flex",
            width: "150px",
            height: "42px",
            backgroundColor: "rgb(247 54 54)",
            borderRadius: "10px",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          FETCH USER API
        </div>
      </div>
    </>
  );
}

export function ClientCompWithRequiredSession() {
  return (
    <SessionAuth>
      <ProtectedPage />
    </SessionAuth>
  );
}
