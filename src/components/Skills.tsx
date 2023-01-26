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

  const formatter = (miscellaneous: Miscellaneous[]) => {
    return new Intl.ListFormat("en", {
      style: "long",
      type: "conjunction",
    }).format(miscellaneous.map(({ name }) => name));
  };

  return (
    <>
      {data && (
        <CategoryItem title="Skills and Interests">
          <DefinitionList>
            {technical && (
              <DefinitionItem
                term="Technical:"
                description={formatter(technical)}
              />
            )}
            {language && (
              <DefinitionItem
                term="Language:"
                description={formatter(language)}
              />
            )}
            {interest && (
              <DefinitionItem
                term="Interest:"
                description={formatter(interest)}
              />
            )}
          </DefinitionList>
        </CategoryItem>
      )}
    </>
  );
};

export default Skills;
