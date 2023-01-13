import { useQueries } from "../pages";
import CategoryItem from "./CategoryItem";
import DefinitionItem from "./DefinitionItem";
import DefinitionList from "./DefinitionList";

const Skills = () => {
  const data = useQueries();

  return (
    <>
      {data && (
        <CategoryItem title="Skills and Interests">
          <DefinitionList>
            {data.technical && (
              <DefinitionItem
                term="Technical:"
                description={data.technical.map(({ name }) => name).join(", ")}
              />
            )}
            {data.language && (
              <DefinitionItem
                term="Language:"
                description={data.language.map(({ name }) => name).join(", ")}
              />
            )}
            {data.interest && (
              <DefinitionItem
                term="Interest:"
                description={data.interest.map(({ name }) => name).join(", ")}
              />
            )}
          </DefinitionList>
        </CategoryItem>
      )}
    </>
  );
};

export default Skills;
