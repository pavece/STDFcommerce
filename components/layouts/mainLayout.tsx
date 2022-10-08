import React, { ReactNode, FC } from "react";
import Head from "next/head";
import { NavBar } from "../ui/navbar";
import { SideDrawer } from "../ui/SideDrawer";

interface Props {
  title: string;
  ogImageUrl?: string;
  description: string;
  children: ReactNode;
  showSearchBar: boolean;
}

export const MainLayout: FC<Props> = ({
  title,
  ogImageUrl,
  description,
  children,
  showSearchBar,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* TODO: add SEO meta */}
      </Head>
      <NavBar showSearchBar={showSearchBar} />
      <SideDrawer />
      <main
        style={{
          margin: "50px auto",
          maxWidth: "1600px",
          padding: "0px 30px",
        }}
      >
        <div>{children}</div>
      </main>
      {/* Foot */}
    </>
  );
};
