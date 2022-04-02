export const tournamentParams = (
  league: string,
  tournament: string,
  date: string
) => {
  let color = "";
  let wincolor = "";
  let hovercolor = "";

  if (tournament == "us-open") {
    tournament = "US Open";
    date = `Played on August ${date}`;
    color = "bg-blue-700";
    wincolor = "#2563eb";
    hovercolor = "#1d4ed8";
  } else if (tournament == "wimbledon") {
    tournament = "Wimbledon";
    date = `Played on June ${date}`;
    color = "bg-green-500";
    wincolor = "#4ade80";
    hovercolor = "#22c55e";
  } else if (tournament == "roland-garros") {
    tournament = "Roland Garros";
    date = `Played on May ${date}`;
    color = "bg-orange-500";
    wincolor = "#fb923c";
    hovercolor = "#f97316";
  } else if (tournament == "australian-open") {
    tournament = "Australian Open";
    date = `Played on January ${date}`;
    color = "bg-sky-500";
    wincolor = "#38bdf8";
    hovercolor = "#0ea5e9";
  }

  return {
    league,
    color,
    wincolor,
    hovercolor,
    date,
    tournament,
  };
};
