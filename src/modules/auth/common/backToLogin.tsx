import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { type FC } from "react";

const BackToLogin: FC = ({}) => {
  return (
    <Link href="/auth/login" className="text-xs uppercase text-emerald-600">
      <div className="flex items-center gap-1">
        <ArrowLeft height={14} />
        Go back to login
      </div>
    </Link>
  );
};
export default BackToLogin;
