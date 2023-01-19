import type { NextPage } from "next";
import AsideAdmin from "../../components/AsideAdmin";
import Panel from "../../components/Panel";

const About: NextPage = () => {
  return (
    <main className="flex min-h-screen justify-center gap-4 bg-slate-100 p-4 text-slate-700 transition-colors dark:bg-slate-700 dark:text-slate-100">
      <AsideAdmin />
      <Panel element="section" className="max-w-5xl flex-grow space-y-4 p-4">
        <h1 className="border-b-2 border-b-slate-700 pb-2 text-3xl font-bold dark:border-b-slate-100">
          About
        </h1>

        <div className="px-4 py-4"></div>
      </Panel>
    </main>
  );
};

export default About;
