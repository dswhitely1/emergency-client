export function parseDate(passedInDate) {
  const newDate = passedInDate ? new Date(passedInDate) : new Date();
  const year = newDate.getFullYear();
  const month =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  return `${year}-${month}-${day}`;
}
