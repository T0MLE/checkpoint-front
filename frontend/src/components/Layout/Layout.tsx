import Head from "next/head";
import Header from "../Header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
      <>
        <Head>
          <title>Checkpoint Front</title>
          <meta
            name="description"
            content="Checkpoint front"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main>{children}</main>
      </>
    );
  }