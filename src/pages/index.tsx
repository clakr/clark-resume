import { Inter } from "@next/font/google";
import { type NextPage } from "next";
import Head from "next/head";
import { createContext, useContext } from "react";
import Aside from "../components/Aside";
import Content from "../components/Content";
import Header from "../components/Header";
import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";

const inter = Inter({
  subsets: ["latin"],
});

const QueriesContext = createContext<
  | {
      contacts: RouterOutputs["contact"]["getAll"] | undefined;
      abouts: RouterOutputs["about"]["getAll"] | undefined;
      educations: RouterOutputs["education"]["getAll"] | undefined;
      experiences: RouterOutputs["experience"]["getAll"] | undefined;
      leaderships: RouterOutputs["leadership"]["getAll"] | undefined;
      technicals: RouterOutputs["technical"]["getAll"] | undefined;
      languages: RouterOutputs["language"]["getAll"] | undefined;
      interests: RouterOutputs["interest"]["getAll"] | undefined;
    }
  | Record<string, never>
>({});

export const useQueries = () => {
  return useContext(QueriesContext);
};

const Home: NextPage = () => {
  const { data: contacts } = api.contact.getAll.useQuery();
  const { data: abouts } = api.about.getAll.useQuery();
  const { data: educations } = api.education.getAll.useQuery();
  const { data: experiences } = api.experience.getAll.useQuery();
  const { data: leaderships } = api.leadership.getAll.useQuery();
  const { data: technicals } = api.technical.getAll.useQuery();
  const { data: languages } = api.language.getAll.useQuery();
  const { data: interests } = api.interest.getAll.useQuery();

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

      <QueriesContext.Provider
        value={{
          contacts,
          abouts,
          educations,
          experiences,
          leaderships,
          technicals,
          languages,
          interests,
        }}
      >
        <main
          className={`${inter.className} bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-50 lg:grid lg:min-h-screen lg:grid-cols-5 xl:grid-cols-4`}
        >
          <Header />
          <Content />
          <Aside />
        </main>
      </QueriesContext.Provider>
    </>
  );
};

export default Home;
