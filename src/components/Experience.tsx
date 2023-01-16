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
            ({
              id,
              organization: {
                position,
                name,
                location,
                timeframeFrom,
                timeframeTo,
              },
              experienceDescs,
            }) => (
              <OrganizationItem
                key={id}
                position={position}
                organization={name}
                organizationLocation={location}
                timeframeFrom={timeframeFrom}
                timeframeTo={timeframeTo}
              >
                <ul className="list-inside list-disc">
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
