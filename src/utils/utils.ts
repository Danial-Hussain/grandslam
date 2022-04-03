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
    wincolor = "#60a5fa";
    hovercolor = "#2563eb";
  } else if (tournament == "wimbledon") {
    tournament = "Wimbledon";
    date = `Played on June ${date}`;
    color = "bg-green-500";
    wincolor = "#4ade80";
    hovercolor = "#16a34a";
  } else if (tournament == "roland-garros") {
    tournament = "Roland Garros";
    date = `Played on May ${date}`;
    color = "bg-orange-500";
    wincolor = "#fb923c";
    hovercolor = "#ea580c";
  } else if (tournament == "australian-open") {
    tournament = "Australian Open";
    date = `Played on January ${date}`;
    color = "bg-sky-500";
    wincolor = "#38bdf8";
    hovercolor = "#0284c7";
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
