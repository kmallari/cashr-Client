"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="h-8 w-8" />;

  return (
    <Button
      className="h-8 w-8 p-0"
      variant="outline"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      {resolvedTheme === "dark" ? (
        <MoonIcon height={16} width={16} />
      ) : resolvedTheme === "light" ? (
        <SunIcon height={16} width={16} />
      ) : null}
    </Button>
  );
};

export default DarkModeToggle;
