import { useQueries } from "../pages";
import CategoryItem from "./CategoryItem";
import DefinitionItem from "./DefinitionItem";
import DefinitionList from "./DefinitionList";

const Skills = () => {
  const { technicals, languages, interests } = useQueries();

  return (
    <>
      {(technicals || languages || interests) && (
        <CategoryItem title="Skills and Interests">
          <DefinitionList>
            {technicals && (
              <DefinitionItem
                term="Technical:"
                description={technicals.map(({ name }) => name).join(", ")}
              />
            )}
            {languages && (
              <DefinitionItem
                term="Language:"
                description={languages.map(({ name }) => name).join(", ")}
              />
            )}
            {interests && (
              <DefinitionItem
                term="Interest:"
                description={interests.map(({ name }) => name).join(", ")}
              />
            )}
          </DefinitionList>
        </CategoryItem>
      )}
    </>
  );
};

export default Skills;
