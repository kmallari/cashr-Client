import Link from "next/link";
import React, { type FC } from "react";

import { getUser } from "@/modules/auth/actions/user";

import DarkModeToggle from "./DarkModeToggle";
import LogoutButton from "../auth/common/LogoutButton";

const HeaderNav: FC = async () => {
  const user = await getUser();

  const leftItems = [
    {
      label: (
        <Link className="select-none" href="/dashboard">
          cashr.app
        </Link>
      ),
      style: "font-bold",
    },
  ];

  const rightItems = [
    {
      label: user.email,
      style: "text-xs",
    },
    {
      label: <DarkModeToggle />,
    },
    {
      label: <LogoutButton />,
    },
  ];

  return (
    <header>
      <nav className="flex flex-row items-center justify-between">
        <ul className="flex flex-row ">
          {leftItems.map((item, i) => (
            <li key={i} className={item.style}>
              {item.label}
            </li>
          ))}
        </ul>
        <ul className="flex flex-row items-center gap-2">
          {rightItems.map((item, i) => (
            <li key={i} className={item.style}>
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;
