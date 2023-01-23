import type { NextPage } from "next";
import Admin from "../../components/Admin";
import Table from "../../components/Table";
import type { TableHeading } from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.education.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

const category = "Education",
  tableHeadRows: TableHeading[] = [
    {
      text: "Organization Name",
    },
    {
      text: "Degree",
    },
    {
      text: "Thesis",
    },
    {
      text: "Awards",
    },
  ];

const Education: NextPage = () => {
  const { data } = api.education.getAll.useQuery();

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
          {data?.map(
            ({ id, degree, thesis, awards, organization: { name } }) => (
              <Table.BodyRow key={id}>
                <Table.Data>{name}</Table.Data>
                <Table.Data>{degree}</Table.Data>
                <Table.Data>{thesis}</Table.Data>
                <Table.Data>{awards}</Table.Data>
                <Table.DataOptions />
              </Table.BodyRow>
            )
          )}
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

export default Education;
