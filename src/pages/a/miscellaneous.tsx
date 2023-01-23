import { Miscellaneous } from "@prisma/client";
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

const category = "Miscellaneous",
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

  let technical: Miscellaneous[] | undefined = undefined,
    language: Miscellaneous[] | undefined = undefined,
    interest: Miscellaneous[] | undefined = undefined;

  if (data) {
    technical = data.filter(({ type }) => type === "TECHNICAL");
    language = data.filter(({ type }) => type === "LANGUAGE");
    interest = data.filter(({ type }) => type === "INTEREST");
  }

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
          {technical && (
            <Table.BodyRow>
              <Table.Data>Technical</Table.Data>
              <Table.Data>
                {technical.map(({ name }) => name).join(", ")}
              </Table.Data>
              <Table.DataOptions />
            </Table.BodyRow>
          )}
          {language && (
            <Table.BodyRow>
              <Table.Data>Language</Table.Data>
              <Table.Data>
                {language.map(({ name }) => name).join(", ")}
              </Table.Data>
              <Table.DataOptions />
            </Table.BodyRow>
          )}
          {interest && (
            <Table.BodyRow>
              <Table.Data>Interest</Table.Data>
              <Table.Data>
                {interest.map(({ name }) => name).join(", ")}
              </Table.Data>
              <Table.DataOptions />
            </Table.BodyRow>
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

export default Miscellaneous;
