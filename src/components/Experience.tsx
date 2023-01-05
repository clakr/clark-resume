import { api } from "../utils/api";
import CategoryItem from "./CategoryItem";
import OrganizationItem from "./OrganizationItem";

const Experience = () => {
  const { data } = api.experience.getAll.useQuery();

  return (
    <>
      {data && (
        <CategoryItem title="Experience">
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
              experienceDescriptions,
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
                  {experienceDescriptions.map(({ id, description }) => (
                    <ListItem key={id} content={description} />
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
