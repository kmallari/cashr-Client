import React, { type FC } from "react";

import SignupForm from "@/modules/auth/signup";
type SignupProps = {};

const Signup: FC<SignupProps> = ({}) => {
  const colCount: number[] = [];
  for (let i = 0; i < 100; i++) {
    colCount.push(i);
  }
  const rowCount: number[] = [];
  for (let i = 0; i < 10; i++) {
    rowCount.push(i);
  }

  return (
    <main className="relative mx-auto overflow-x-hidden">
      <div className="absolute h-1/2 w-full bg-gradient-to-b from-stone-300 to-transparent"></div>
      <div className="absolute left-0 top-0 flex h-1/2 w-full flex-row">
        <div className="h-full w-1/2 bg-gradient-to-tr from-white to-transparent"></div>
        <div className="h-full w-1/2 bg-gradient-to-tl from-white to-transparent"></div>
      </div>
      <div className="absolute mx-auto flex h-full w-full flex-col items-center">
        {rowCount.map((i) => (
          <div key={i} className="flex">
            {colCount.map((j) => (
              <span
                key={`${i}-${j}`}
                className="h-10 w-10 border-b border-r border-white/50"
              ></span>
            ))}
          </div>
        ))}
      </div>
      <SignupForm />
    </main>
  );
};

export default Signup;
