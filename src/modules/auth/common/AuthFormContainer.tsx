"use client";

import React, { type FC, PropsWithChildren } from "react";

const AuthFormContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4">
      <div className="rounded-lg shadow-2xl shadow-stone-300 dark:shadow-stone-700">
        <div className="flex h-fit w-full flex-col gap-6 rounded-lg border border-stone-200 bg-gradient-to-t from-stone-50 to-white/20 p-4 shadow-inner shadow-white backdrop-blur-sm dark:border-stone-700/70 dark:from-stone-600/70 dark:to-stone-900 dark:shadow-stone-900 sm:p-8 md:p-12">
          <>{children}</>
        </div>
      </div>
    </div>
  );
};
export default AuthFormContainer;
