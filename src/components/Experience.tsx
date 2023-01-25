import { useQueries } from "../pages";
import CategoryItem from "./CategoryItem";
import OrganizationItem from "./OrganizationItem";

const Experience = () => {
  const data = useQueries();

  return (
    <>
      {data && (
        <CategoryItem title="Experience">
          {data.experience.map(
            ({ id, organization: { ...rest }, experienceDescs }) => (
              <OrganizationItem key={id} {...rest}>
                <ul className="list-inside list-disc px-4">
                  {experienceDescs.map(({ id, desc }) => (
                    <ListItem key={id} content={desc} />
                  ))}
                </ul>
              </OrganizationItem>
            )
          )}
        </CategoryItem>
      )}
    </>
  );
};

export default Experience;

type ListItemProps = {
  action?: string;
  content: string;
};

const ListItem = ({ action, content }: ListItemProps) => {
  return (
    <li>
      <span className="font-medium">{action} </span>
      {content}
    </li>
  );
};
