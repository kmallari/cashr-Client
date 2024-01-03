import React, { type FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";

const Loading: FC = () => {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="spayce-y-4 -mx-4 lg:w-1/5">
          <Skeleton className="h-[40px] w-[264px]" />
          <Skeleton className="h-[40px] w-[264px]" />
          <Skeleton className="h-[40px] w-[264px]" />
        </aside>
        <div className="flex-1 space-y-4 lg:max-w-4xl">
          <header>
            <nav className="flex flex-row items-center justify-between">
              <ul className="flex flex-row ">
                <li>
                  <Skeleton className="h-[20px] w-[80px]" />
                </li>
              </ul>
              <ul className="flex flex-row items-center gap-2">
                <Skeleton className="h-[32px] w-[80px]" />
                <Skeleton className="h-[32px] w-[32px]" />
                <Skeleton className="h-[32px] w-[32px]" />
              </ul>
            </nav>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Loading;
