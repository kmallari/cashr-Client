import React, { type FC } from "react";

import { ClientCompWithRequiredSession } from "@/modules/auth/common/protectedPage";
import { ServerCompWithSessionInfo } from "@/modules/auth/common/serverCompWithSessionInfo";

type DashboardProps = {};

const Dashboard: FC<DashboardProps> = async ({}) => {
  return (
    <>
      <ServerCompWithSessionInfo />
      <ClientCompWithRequiredSession />
    </>
  );
};
export default Dashboard;
