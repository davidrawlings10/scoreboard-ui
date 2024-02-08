const getDateString = (d: Date) => {
  return (
    d.getMonth() +
    "/" +
    d.getDate() +
    "/" +
    d.getFullYear() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes()
  );
};

export { getDateString };
