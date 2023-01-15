import type { Miscellaneous } from "@prisma/client";
import { useQueries } from "../pages";
import CategoryItem from "./CategoryItem";
import DefinitionItem from "./DefinitionItem";
import DefinitionList from "./DefinitionList";

const Skills = () => {
  const data = useQueries();

  let technical: Miscellaneous[] | undefined = undefined,
    language: Miscellaneous[] | undefined = undefined,
    interest: Miscellaneous[] | undefined = undefined;

  if (data) {
    technical = data?.miscellaneous.filter(({ type }) => type === "TECHNICAL");
    language = data?.miscellaneous.filter(({ type }) => type === "LANGUAGE");
    interest = data?.miscellaneous.filter(({ type }) => type === "INTEREST");
  }

  return (
    <>
      {data && (
        <CategoryItem title="Skills and Interests">
          <DefinitionList>
            {technical && (
              <DefinitionItem
                term="Technical:"
                description={technical.map(({ name }) => name).join(", ")}
              />
            )}
            {language && (
              <DefinitionItem
                term="Language:"
                description={language.map(({ name }) => name).join(", ")}
              />
            )}
            {interest && (
              <DefinitionItem
                term="Interest:"
                description={interest.map(({ name }) => name).join(", ")}
              />
            )}
          </DefinitionList>
        </CategoryItem>
      )}
    </>
  );
};

export default Skills;
