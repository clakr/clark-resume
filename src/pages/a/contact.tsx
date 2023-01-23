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

const category = "Contact",
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
    <Admin pageTitle={category}>
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
              <Table.DataOptions />
            </Table.BodyRow>
          ))}
        </Table.Body>
        <Table.AddCategory
          category={category}
          colSpan={tableHeadRows.length + 1}
          buttonOnClick={() => console.log("foo!")}
        />
      </Table>
    </Admin>
  );
};

export default Contact;
