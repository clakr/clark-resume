import { Inter } from "@next/font/google";
import type { NextPage } from "next";
import Head from "next/head";
import { createContext, useContext } from "react";
import Aside from "../components/Aside";
import CommandPalette from "../components/CommandPalette";
import Content from "../components/Content";
import Header from "../components/Header";
import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";
import createTRPCSSG from "../utils/createTRPCSSG";

const inter = Inter({
  subsets: ["latin"],
});

const QueriesContext = createContext<
  RouterOutputs["allInfo"]["getAll"] | undefined
>(undefined);

export const useQueries = () => {
  return useContext(QueriesContext);
};

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.allInfo.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

const Home: NextPage = () => {
  const { data } = api.allInfo.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Clark Kenneth C. Tolosa - Web Developer</title>
        <meta
          name="description"
          content="I am a passionate Web Developer. Currently in love with Frontend Engineering with libraries and modern JavaScript frameworks with the likes of Tailwind CSS, React, and Next. Also interested in managing, interpreting, and visualizing data in the Backend and engineering the connection of both Frontend and Backend. Capable of Full Stack Web Development. Knowledgeable in modern technologies."
        />
        <link rel="icon" href="favicon/favicon.ico" />
      </Head>

      <QueriesContext.Provider value={data}>
        <main
          className={`${inter.className} bg-slate-50 text-slate-900 transition-colors selection:bg-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:selection:bg-slate-700 lg:grid lg:min-h-screen lg:grid-cols-5 xl:grid-cols-4`}
        >
          <Header />
          <Content />
          <Aside />
        </main>

        <CommandPalette />
      </QueriesContext.Provider>
    </>
  );
};

export default Home;
