"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SuccessfulVerification = () => {
  const [countdown, setCountdown] = useState(5);
  const { push } = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  return (
    <div className="mx-auto flex h-screen max-w-[520px] flex-col items-center justify-center gap-4 px-4">
      <div className="w-full space-y-4 rounded-md text-center ">
        <h1 className="text-xl font-medium text-emerald-600">
          Successfully verified your account!
        </h1>
        <p className="text-sm text-stone-500">
          Redirecting to the dashboard in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};
export default SuccessfulVerification;
