import type { NextPage } from "next";
import Admin from "../../components/Admin";
import Table from "../../components/Table";
import type { TableHeading } from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.contact.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

const intent = "Contact",
  tableHeadRows: TableHeading[] = [
    {
      text: "Description",
    },
    {
      text: "Type",
    },
  ];

const Contact: NextPage = () => {
  const { data } = api.contact.getAll.useQuery();

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
          {data?.map(({ id, desc, type }) => (
            <Table.BodyRow key={id}>
              <Table.Data>{desc}</Table.Data>
              <Table.Data>{type}</Table.Data>
              <Table.DataOptions intent={intent} />
            </Table.BodyRow>
          ))}
        </Table.Body>
        <Table.AddIntent intent={intent} colSpan={tableHeadRows.length + 1} />
      </Table>
    </Admin>
  );
};

export default Contact;
