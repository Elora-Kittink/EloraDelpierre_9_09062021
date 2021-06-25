export const formatDate = (dateStr) => {
  // console.log(dateStr);
  const date = new Date(dateStr);
  // console.log(date);
  const ye = new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("en-GB", { month: "2-digit" }).format(date);
  const da = new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(date);
  const month = mo.charAt(0).toUpperCase() + mo.slice(1);
  // return `${parseInt(da)} ${month.substr(0, 3)}. ${ye.toString().substr(2, 4)}`;
  // console.log(`${ye}.${month}.${da}`);
  return `${ye}-${month}-${da}`;
}; // retourne un format jour/mois/année alors que le test attends un format année/mois/jour//

export const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "accepted":
      return "Accepté";
    case "refused":
      return "Refused";
  }
};
