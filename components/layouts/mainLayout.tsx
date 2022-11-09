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
  ogImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/sample_og_img.jpg`,
  description,
  children,
  showSearchBar,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="twitter:image" property="og:image" content={ogImageUrl} />
        <link property="image" href={ogImageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:src" content={ogImageUrl} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}
        />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
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
    </>
  );
};
