"use client";

import { LineWobble } from "@uiball/loaders";
import React, { type FC } from "react";

type FullScreenLoaderProps = {};

const FullScreenLoader: FC<FullScreenLoaderProps> = ({}) => {
  return (
    <div className="w-Full flex h-screen items-center justify-center bg-stone-50">
      <LineWobble />
    </div>
  );
};

export default FullScreenLoader;
