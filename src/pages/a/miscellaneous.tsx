import type { NextPage } from "next";
import Admin from "../../components/Admin";
import Table from "../../components/Table";
import type { TableHeading } from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.miscellaneous.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

const intent = "Miscellaneous",
  tableHeadRows: TableHeading[] = [
    {
      text: "Type",
    },
    {
      text: "Name",
    },
  ];

const Miscellaneous: NextPage = () => {
  const { data } = api.miscellaneous.getAll.useQuery();

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
          {data?.map(({ id, name, type }) => (
            <Table.BodyRow key={id}>
              <Table.Data>{name}</Table.Data>
              <Table.Data>{type}</Table.Data>
            </Table.BodyRow>
          ))}
        </Table.Body>
        <Table.Foot intent={intent} colSpan={tableHeadRows.length + 1} />
      </Table>
    </Admin>
  );
};

export default Miscellaneous;
