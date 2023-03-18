const getTimeframe = ({
  timeframeFrom,
  timeframeTo,
}: {
  timeframeFrom: Date;
  timeframeTo: Date | null;
}) => {
  if (!timeframeTo) return `${formatTimeframe(timeframeFrom)} - Present`;

  return `${formatTimeframe(timeframeFrom)} - ${formatTimeframe(timeframeTo)}`;
};

const formatTimeframe = (timeframe: Date) =>
  `${new Intl.DateTimeFormat("en-PH", {
    month: "long",
  }).format(timeframe)} '${timeframe.getFullYear().toString().slice(-2)}`;

export default getTimeframe;
