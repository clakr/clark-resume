import { useQueries } from "../pages";
import CategoryItem from "./CategoryItem";
import DefinitionItem from "./DefinitionItem";
import DefinitionList from "./DefinitionList";
import OrganizationItem from "./OrganizationItem";

const Education = () => {
  const data = useQueries();

  return (
    <>
      {data && (
        <CategoryItem title="Education">
          {data.education.map(
            ({ id, degree, thesis, awards, organization: { ...rest } }) => (
              <OrganizationItem key={id} {...rest}>
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
