import Education from "./Education";
import Experience from "./Experience";
import Footer from "./Footer";
import Leadership from "./Leadership";
import Skills from "./Skills";

const Content = () => {
  return (
    <section className="p-6 md:p-9 lg:col-span-3 lg:p-12 xl:px-20">
      <article className="hidden lg:block">
        <h1 className="text-4xl font-bold leading-6">
          Clark Kenneth C. Tolosa
        </h1>
        <h2
          className="text-xl
      opacity-75"
        >
          Web Developer
        </h2>
      </article>

      <Education />
      <Experience />
      <Leadership />
      <Skills />

      <Footer />
    </section>
  );
};

export default Content;
