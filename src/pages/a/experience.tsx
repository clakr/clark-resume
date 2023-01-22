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
              <Table.Data>
                <Table.Collapsible name={name}>
                  <ul className="ml-12 list-outside list-disc text-justify text-sm">
                    {experienceDescs.map(({ desc }, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </Table.Collapsible>
              </Table.Data>
              <Table.DataOptions intent={intent} />
            </Table.BodyRow>
          ))}
        </Table.Body>
        <Table.AddIntent intent={intent} colSpan={tableHeadRows.length + 1} />
      </Table>
    </Admin>
  );
};

export default Experience;
