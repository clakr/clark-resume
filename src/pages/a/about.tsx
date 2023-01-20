import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { NextPage } from "next";
import superjson from "superjson";
import Admin from "../../components/Admin";
import Table from "../../components/Table";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import type { TableHeading } from "../../types";
import { api } from "../../utils/api";

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createInnerTRPCContext(),
    transformer: superjson,
  });

  await ssg.about.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

const intent = "About";

const tableHeadRows: TableHeading[] = [
  {
    text: "Description",
    colSpan: 2,
  },
];

const About: NextPage = () => {
  const { data } = api.about.getAll.useQuery();

  return (
    <Admin pageTitle={intent}>
      <Table>
        <Table.Head>
          {tableHeadRows.map(({ text, ...rest }, index) => (
            <Table.Heading {...rest} key={index}>
              {text}
            </Table.Heading>
          ))}
        </Table.Head>
        <Table.Body>
          {data?.map(({ id, desc }) => (
            <Table.BodyRow key={id}>
              <Table.Data>{desc}</Table.Data>
            </Table.BodyRow>
          ))}
        </Table.Body>
        <Table.Foot intent={intent} colSpan={tableHeadRows.length + 1} />
      </Table>
    </Admin>
  );
};

export default About;
