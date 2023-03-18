const getTimeframe = ({
  timeframeFrom,
  timeframeTo,
}: {
  timeframeFrom: Date;
  timeframeTo: Date | null;
}) => {
  if (!timeframeTo) return `${timeframeFrom.getFullYear()} - Present`;

  if (timeframeTo.getFullYear() - timeframeFrom.getFullYear() >= 1)
    return `${timeframeFrom.getFullYear()} - ${timeframeTo.getFullYear()}`;

  return `${formatTimeframe(timeframeFrom)} - ${formatTimeframe(timeframeTo)}`;
};

const formatTimeframe = (timeframe: Date) =>
  `${new Intl.DateTimeFormat("en-PH", {
    month: "long",
  }).format(timeframe)} ${timeframe.getFullYear()}`;

export default getTimeframe;
