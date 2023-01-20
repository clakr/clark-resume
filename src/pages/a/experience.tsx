import type { NextPage } from "next";
import Admin from "../../components/Admin";
import Table from "../../components/Table";
import type { TableHeading } from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.experience.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

const intent = "Experience",
  tableHeadRows: TableHeading[] = [
    {
      text: "Organization Name",
    },
    {
      text: "Descriptions",
    },
  ];

const Experience: NextPage = () => {
  const { data } = api.experience.getAll.useQuery();

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
          {data?.map(({ id, organization: { name }, experienceDescs }) => (
            <Table.BodyRow key={id}>
              <Table.Data>{name}</Table.Data>
              <Table.Data>
                <ul className="list-outside list-disc text-justify">
                  {experienceDescs.map(({ desc }, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </Table.Data>
            </Table.BodyRow>
          ))}
        </Table.Body>
        <Table.Foot intent={intent} colSpan={tableHeadRows.length + 1} />
      </Table>
    </Admin>
  );
};

export default Experience;
