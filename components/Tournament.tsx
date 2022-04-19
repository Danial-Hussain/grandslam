import Image from "next/image";

interface TournamentProps {
  image: string;
  name: string;
  tournament_url: string;
  location: string;
  year: string;
}

const Tournament = ({
  image,
  name,
  tournament_url,
  location,
  year,
}: TournamentProps) => {
  const years = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];
  return (
    <div className="flex flex-col gap-x-8 gap-y-4 md:grid md:grid-cols-2">
      <Image src={image} width={500} height={400} className="rounded-xl" />
      <div className="flex flex-col gap-y-2 order-last md:order-none">
        <h1 className="text-4xl font-semibold">{name}</h1>
        <div className="flex flex-row gap-2 flex-wrap items-center">
          <div>Location: {location}</div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <div>Founded: {year}</div>
        </div>
        <h2 className="text-lg underline underline-offset-2 decoration-4 decoration-gray-400">
          ATP Tournaments
        </h2>
        <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 mt-2">
          {years.map((year, i) => (
            <a
              className="border border-2 border-gray-500 px-2 w-14 text-center cursor-pointer"
              href={`/results/atp/${tournament_url}/${year}`}
              key={i}
            >
              {year}
            </a>
          ))}
        </div>
        <h2 className="text-lg underline underline-offset-2 decoration-4 decoration-gray-400">
          WTA Tournaments
        </h2>
        <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 mt-2">
          {years.map((year, i) => (
            <a
              className="border border-2 border-gray-500 px-2 w-14 text-center cursor-pointer"
              href={`/results/wta/${tournament_url}/${year}`}
              key={i}
            >
              {year}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tournament;
