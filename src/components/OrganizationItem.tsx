import React, { useEffect, useState } from "react";
import getDate from "../utils/getDate";

type OrganizationItemProps = {
  position: string | null;
  name: string;
  location: string;
  timeframeFrom: Date;
  timeframeTo: Date | null;
};

const OrganizationItem = ({
  position,
  name,
  location,
  timeframeFrom,
  timeframeTo,
  children,
}: React.PropsWithChildren<OrganizationItemProps>) => {
  const [timeframe, setTimeframe] = useState("");

  useEffect(() => {
    setTimeframe(`${getDate(timeframeFrom)} - ${getDate(timeframeTo)}`);
  }, [timeframeTo, timeframeFrom]);

  return (
    <div className="space-y-2">
      <div className="text-lg leading-4 lg:leading-3">
        <h4>
          {position !== "Student" && (
            <span className="mr-2 font-bold">{position},</span>
          )}
          {name}

          <span className="ml-2 text-xs font-bold opacity-75">{location}</span>
        </h4>
        <label className="text-base opacity-75">{timeframe}</label>
      </div>

      {children}
    </div>
  );
};

export default OrganizationItem;
