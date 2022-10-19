import { grey } from "@mui/material/colors";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  href: string;
}

export const Category: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href}>
      <div
        style={{
          borderRadius: "50px",
          padding: "10px 30px",
          display: "center",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 20px",
          border: "1px solid black",
          cursor: "pointer",
          transition: "background-color .3s",
        }}
        className="category-selector"
      >
        {children}
      </div>
    </Link>
  );
};
