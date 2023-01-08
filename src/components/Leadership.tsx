import { useQueries } from "../pages";
import CategoryItem from "./CategoryItem";
import DefinitionItem from "./DefinitionItem";
import DefinitionList from "./DefinitionList";
import OrganizationItem from "./OrganizationItem";

const Leadership = () => {
  const { leaderships: data } = useQueries();

  return (
    <>
      {data && (
        <CategoryItem title="Leadership">
          {data.map(
            ({
              id,
              organization: {
                position,
                name,
                location,
                timeframeFrom,
                timeframeTo,
              },
              leadershipProjects,
            }) => (
              <OrganizationItem
                key={id}
                position={position}
                organization={name}
                organizationLocation={location}
                timeframeFrom={timeframeFrom}
                timeframeTo={timeframeTo}
              >
                <div className="space-y-4 lg:space-y-8">
                  {leadershipProjects.map(
                    ({ id, course, name, purpose, otherPositions }) => (
                      <LeadershipItem key={id} course={course}>
                        {name && (
                          <DefinitionItem term="Project:" description={name} />
                        )}
                        {purpose && (
                          <DefinitionItem
                            term="Purpose:"
                            description={purpose}
                          />
                        )}
                        {otherPositions && (
                          <DefinitionItem
                            term="Other Positions:"
                            description={otherPositions}
                          />
                        )}
                      </LeadershipItem>
                    )
                  )}
                </div>
              </OrganizationItem>
            )
          )}
        </CategoryItem>
      )}
    </>
  );
};

export default Leadership;

type LeadershipItemProps = {
  course: string;
};

const LeadershipItem = ({
  course,
  children,
}: React.PropsWithChildren<LeadershipItemProps>) => {
  return (
    <>
      <h4 className="font-medium">{course}</h4>
      <DefinitionList>{children}</DefinitionList>
    </>
  );
};
