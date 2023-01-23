import type { NextPage } from "next";
import Admin from "../../components/Admin";
import Table from "../../components/Table";
import type { TableHeading } from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";
import getDate from "../../utils/getDate";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.organization.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

const category = "Organization",
  tableHeadRows: TableHeading[] = [
    {
      text: "Name",
    },
    {
      text: "Position",
    },
    {
      text: "Location",
    },
    {
      text: "Timeframe From",
    },
    {
      text: "Timeframe To",
    },
  ];

const Organization: NextPage = () => {
  const { data } = api.organization.getAll.useQuery();

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
            ({ id, name, position, location, timeframeFrom, timeframeTo }) => (
              <Table.BodyRow key={id}>
                <Table.Data>{name}</Table.Data>
                <Table.Data>{position}</Table.Data>
                <Table.Data>{location}</Table.Data>
                <Table.Data>{getDate(timeframeFrom)}</Table.Data>
                <Table.Data>{getDate(timeframeTo)}</Table.Data>
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

export default Organization;
