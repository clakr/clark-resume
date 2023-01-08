import { useQueries } from "../pages";
import CategoryItem from "./CategoryItem";
import DefinitionItem from "./DefinitionItem";
import DefinitionList from "./DefinitionList";
import OrganizationItem from "./OrganizationItem";

const Education = () => {
  const { educations: data } = useQueries();

  return (
    <>
      {data && (
        <CategoryItem title="Education">
          {data.map(
            ({
              id,
              degree,
              thesis,
              awards,
              organization: {
                position,
                name,
                location,
                timeframeFrom,
                timeframeTo,
              },
            }) => (
              <OrganizationItem
                key={id}
                position={position}
                organization={name}
                organizationLocation={location}
                timeframeFrom={timeframeFrom}
                timeframeTo={timeframeTo}
              >
                <DefinitionList>
                  {degree && (
                    <DefinitionItem term="Degree:" description={degree} />
                  )}
                  {thesis && (
                    <DefinitionItem
                      term="Thesis/Capstone:"
                      description={thesis}
                    />
                  )}
                  {awards && (
                    <DefinitionItem term="Awards:" description={awards} />
                  )}
                </DefinitionList>
              </OrganizationItem>
            )
          )}
        </CategoryItem>
      )}
    </>
  );
};

export default Education;
