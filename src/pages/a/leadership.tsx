import type { NextPage } from "next";
import Admin from "../../components/Admin";
import Table from "../../components/Table";
import type { TableHeading } from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.leadership.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

const intent = "Leadership",
  tableHeadRows: TableHeading[] = [
    {
      text: "Organization Name",
    },
  ];

type DefinitionItemProps = {
  term: string;
  description: string;
};

const DefinitionItem = ({ description, term }: DefinitionItemProps) => {
  return (
    <>
      <dd className="col-span-2 font-medium">{term}: </dd>
      <dt className="col-span-8">{description}</dt>
    </>
  );
};

const Leadership: NextPage = () => {
  const { data } = api.leadership.getAll.useQuery();

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
          {data?.map(({ id, organization, leadershipProjects }) => (
            <Table.BodyRow key={id}>
              <Table.Data>
                <Table.Collapsible name={organization.name}>
                  <div className="ml-8 space-y-6">
                    {leadershipProjects.map(
                      ({ id, name, course, purpose, otherPositions }) => (
                        <Table.Collapsible name={course} key={id} type="sub">
                          <dl className="ml-8 grid grid-cols-10 gap-2">
                            {name && (
                              <DefinitionItem
                                description={name}
                                term="Project"
                              />
                            )}
                            {purpose && (
                              <DefinitionItem
                                description={purpose}
                                term="Purpose"
                              />
                            )}
                            {otherPositions && (
                              <DefinitionItem
                                description={otherPositions}
                                term="Other Position/s"
                              />
                            )}
                          </dl>
                        </Table.Collapsible>
                      )
                    )}
                  </div>
                </Table.Collapsible>
              </Table.Data>
              <Table.DataOptions />

              {/*<Table.Data>
                <ul className="list-outside list-disc text-justify">
                  {leadershipProjects.map(({ course }, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </Table.Data> */}
            </Table.BodyRow>
          ))}
        </Table.Body>
        <Table.AddIntent intent={intent} colSpan={tableHeadRows.length + 1} />
      </Table>
    </Admin>
  );
};

export default Leadership;
