import React, { ReactNode, FC } from "react";
import Head from "next/head";

interface Props {
  title: string;
  ogImageUrl?: string;
  description: string;
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({
  title,
  ogImageUrl,
  description,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* TODO: add SEO meta */}
      </Head>
      {/* Nav */}
      <main
        style={{
          margin: "50px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        <div>{children}</div>
      </main>
      {/* Foot */}
    </>
  );
};
