import { Inter } from "@next/font/google";
import { type NextPage } from "next";
import Head from "next/head";
import Aside from "../components/Aside";
import Content from "../components/Content";
import Header from "../components/Header";
import { api } from "../utils/api";

const inter = Inter({
  subsets: ["latin"],
});

const Home: NextPage = () => {
  const { data } = api.about.getAll.useQuery();

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

      <main
        className={`${inter.className} bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-50 lg:grid lg:min-h-screen lg:grid-cols-5 xl:grid-cols-4`}
      >
        <Header />
        <Content />
        <Aside />
      </main>
    </>
  );
};

export default Home;
