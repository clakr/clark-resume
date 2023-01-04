import { api } from "../utils/api";
import CategoryItem from "./CategoryItem";
import DefinitionItem from "./DefinitionItem";
import DefinitionList from "./DefinitionList";

const Skills = () => {
  const { data: technicals } = api.technical.getAll.useQuery();
  const { data: languages } = api.language.getAll.useQuery();
  const { data: interests } = api.interest.getAll.useQuery();

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
