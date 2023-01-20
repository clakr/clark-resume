const getDate = (timeframe: Date | null) => {
  if (timeframe) {
    return `${new Intl.DateTimeFormat("en-PH", {
      month: "long",
    }).format(timeframe)} ${timeframe.getFullYear()}`;
  }

  return "Present";
};

export default getDate;
