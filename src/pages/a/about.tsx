import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const About: NextPage = () => {
  const { data } = useSession();

  return <> {data ? <pre>{JSON.stringify(data)}</pre> : "wala"} </>;
};

export default About;
